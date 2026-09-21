import json
from pathlib import Path
root=Path(__file__).resolve().parents[1]
data=json.loads((root/"02_PUBLIC_DATA/public_standards_phase1_v1_0_7.json").read_text())
assert len(data)==2836
assert sum(x["current"] for x in data)==2757
assert sum(not x["current"] for x in data)==79
assert sum(x["relationship_counts"]["Supports"] for x in data)==1420
assert sum(x["relationship_counts"]["Reinforces"] for x in data)==2424
assert sum(x["relationship_counts"]["Next"] for x in data)==1420
ela=[x for x in data if x["area"]=="ela"]
cur=[x for x in ela if x["current"]]
assert len(ela)==218 and len(cur)==160
assert sum(x.get("official_text_source")=="2023 NJSLS-ELA" for x in cur)==160
assert sum(bool(x.get("official_components")) for x in cur)==40
assert sum(len(x.get("official_components",[])) for x in cur)==183
for x in data:
    assert "app_count" not in x and "programs" not in x and "curriculum_preview" not in x
assert len({x["uid"] for x in data})==len(data)
print("PASS — Phase 1 Free Standards data verified.")
