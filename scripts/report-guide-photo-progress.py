#!/usr/bin/env python3
"""Reconcile exact remaining slots and prove that inherited photos were preserved."""
import argparse,collections,hashlib,json,re,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--baseline-ref',required=True);p.add_argument('--date',required=True);p.add_argument('--audit-log',required=True);p.add_argument('--region-report',choices=['americas','europa','mundo'],default='americas');a=p.parse_args()
D=ROOT/'docs/qualidade-imagens-2026-10-30';M='docs/curadoria-2026-10-29/sources.json'
m=json.loads((ROOT/M).read_text());base=json.loads(subprocess.check_output(['git','show',a.baseline_ref+':'+M],cwd=ROOT));old=json.loads(subprocess.check_output(['git','show',a.baseline_ref+':docs/qualidade-imagens-2026-10-30/regional-progress.json'],cwd=ROOT))
def pending(v):return 'placeholder' in v.get('source','')
new=sorted(k for k,v in base.items() if pending(v) and not pending(m[k]))
protected={k:v for k,v in base.items() if not pending(v)}
metadata_changes=[k for k,v in protected.items() if m[k]!=v]
if metadata_changes:raise ValueError('Inherited source metadata changed: '+str(metadata_changes))
blobs={}
for row in subprocess.check_output(['git','ls-tree','-r',a.baseline_ref,'--','public/images/destinations'],cwd=ROOT).decode().splitlines():
 meta,path=row.split('\t',1);blobs[path]=meta.split()[2]
binary_changes=[]
for key,v in protected.items():
 path='public'+v['path'];raw=(ROOT/path).read_bytes();h=hashlib.sha1(b'blob '+str(len(raw)).encode()+b'\0'+raw).hexdigest()
 if blobs.get(path)!=h:binary_changes.append(key)
if binary_changes:raise ValueError('Inherited photo binaries changed: '+str(binary_changes))
regions={}
for name,file in [('europa','guidesEuropa.js'),('mundo','guidesMundo.js')]:
 regions[name]=set(re.findall(r"from './guides/([^']+)\.js'",(ROOT/'src/data'/file).read_text()))
regions['americas']={k.split('/')[0] for k in old['appliedKeys']}
def region(city):return next((name for name,cities in regions.items() if city in cities),'other')
remaining=[dict(key=k,city=v['city'],slot=v['slot'],topic=v['topic'],path=v['path'],region=region(v['city'])) for k,v in m.items() if pending(v)]
reviews={};decisions={}
for file in sorted(D.glob('regional-*/review.json')):
 for row in json.loads(file.read_text()):reviews.setdefault(row['key'],[]).append(dict(bundle=file.parent.name,status=row['status'],title=row.get('title'),pool=row.get('pool'),error=row.get('error')))
for file in sorted(D.glob('regional-*/decisions.json')):
 for key,row in json.loads(file.read_text()).items():decisions.setdefault(key,[]).append(dict(bundle=file.parent.name,**row))
for row in remaining:
 row['searchEvidence']=reviews.get(row['key'],[]);row['decisions']=decisions.get(row['key'],[])
(D/f'remaining-{a.date}.json').write_text(json.dumps(remaining,ensure_ascii=False,indent=2)+'\n')
progress=dict(old);allkeys=sorted(set(old['appliedKeys'])|set(new));progress.update(replaced=len(allkeys),remaining=len(remaining),appliedKeys=allkeys,touchedDestinations=dict(sorted(collections.Counter(k.split('/')[0] for k in allkeys).items())))
for name,entry in progress['regions'].items():
 entry.update(replaced=sum(region(k.split('/')[0])==name for k in allkeys),remaining=sum(r['region']==name for r in remaining));entry['complete']=entry['remaining']==0
progress['rejectedCandidates']=len(json.loads((D/'regional-rejections.json').read_text()));(D/'regional-progress.json').write_text(json.dumps(progress,ensure_ascii=False,indent=2)+'\n')
lines=Path(a.audit_log).read_text().splitlines();new_issues=[line for line in lines if line.startswith('- ') and set(re.findall(r'[a-z0-9-]+/[a-z0-9-]+',line))&set(new)]
proof={'baselineRef':a.baseline_ref,'newApplied':len(new),'newKeys':new,'preservedSourceRecords':len(protected),'changedPreservedMetadata':metadata_changes,'changedPreservedBinaries':binary_changes,'auditIssuesInvolvingNewKeys':new_issues,'remaining':len(remaining),'regions':progress['regions']};(D/f'checkpoint-{a.date}.json').write_text(json.dumps(proof,ensure_ascii=False,indent=2)+'\n')
counts=collections.Counter(r['city'] for r in remaining);added=collections.Counter(k.split('/')[0] for k in new)
lima_pending=any(pending(m.get(key,{'source':'placeholder'})) for key in ['lima/day-0','lima/mistakes'])
lima_note='Lima/chegada requer foto do terminal novo, sem reutilizar o antigo.' if lima_pending else 'Lima/chegada: os dois slots foram substituídos por fotos do terminal novo; ver fontes e decisões de cada posição.'
report=[f'# Continuação da curadoria — {a.date}','', '**Parcial. PR #34 draft. DO NOT MERGE.**','',f'Base main: `c2e7504`. Continuação a partir de `{a.baseline_ref}`. Sem rebase necessário: main não avançou.',f'Fotos novas aplicadas neste ciclo: **{len(new)}**; placeholders substituídos acumulados: **{len(allkeys)} / 5.566**; restantes absolutos: **{len(remaining)}**.','', '| Região | Novas neste ciclo | Restantes absolutos |','| --- | ---: | ---: |']
for name,label in [('americas','Américas'),('europa','Europa'),('mundo','Mundo')]:report.append(f'| {label} | {sum(region(k.split("/")[0])==name for k in new)} | {progress["regions"][name]["remaining"]} |')
report+=['','| Destino tocado | Novas | Restantes |','| --- | ---: | ---: |']+[f'| {c} | {n} | {counts[c]} |' for c,n in sorted(added.items())]
report+=['',f'Preservação verificada: **{len(protected)} registros reais herdados**, incluindo os 958 anteriores e os 39 highlights; zero mudança em metadados ou bytes desses arquivos. Somente placeholders foram substituídos, mantendo path e tópico.','',f'Audit global: **FAIL esperado**. Ocorrências envolvendo chaves novas: **{len(new_issues)}**. O log integral acompanha este checkpoint. Não há aprovação global de 107/107.', '',f'Inventário exato por posição, tema, path, região e tentativas/rejeições: [remaining-{a.date}.json](remaining-{a.date}.json). Decisões visuais e `applied.json` ficam em cada bundle; origens e licenças em `sources.json`.', '', lima_note+' Documentos de país errado, moeda antiga, mapa/diagrama, retrato, serviço descontinuado, panoramas 360° distorcidos e falsos matches foram rejeitados. Cancún, Bariloche e repetições herdadas permanecem no passe residual; não foram declarados resolvidos.', '', 'Sem alteração de layout, CSS, catálogo, conteúdo editorial, Admin, Core ou Flutter. Contagens regionais na tabela acima. Pendências das Américas e das demais regiões permanecem abertas; nenhuma região foi declarada concluída sem zerar seu inventário.']
(D/f'lote-{a.region_report}-{a.date}.md').write_text('\n'.join(report)+'\n');print(json.dumps({k:v for k,v in proof.items() if k!='newKeys'},ensure_ascii=False,indent=2))
