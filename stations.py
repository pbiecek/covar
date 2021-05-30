import pandas as pd
import json
import sys
import os

OWN_FILE_MIN = 10
ROOT = 'docs/stations'
COMMON_FILE = 'data/$common.json'
INDEX_FILE = 'data/$index.json'

NEW_COLUMN_NAMES = ['region', 'date', 'srwe', 'psse', 'variant']

df = pd.read_excel(sys.argv[1], sheet_name=sys.argv[2])
df = df.set_axis(NEW_COLUMN_NAMES, axis='columns')
df['variant'] = df['variant'].fillna('')
df['srwe'] = df['srwe'].fillna('')
index = dict()
stations = df.psse.unique()
common_entries = []

if not os.path.exists(os.path.join(ROOT, 'data')):
    os.mkdir(os.path.join(ROOT, 'data'))

for station in stations:
    station_entries = df[df['psse'] == station]

    target = f'data/{station}.json' if len(station_entries) > OWN_FILE_MIN else COMMON_FILE
    index[station] = target
    dict_data = station_entries.to_dict('records')
    if target == COMMON_FILE:
        common_entries += dict_data
    else:
        with open(os.path.join(ROOT, target), 'w') as f:
            f.write(json.dumps(dict_data))

with open(os.path.join(ROOT, INDEX_FILE), 'w') as f:
    f.write(json.dumps(index))
with open(os.path.join(ROOT, COMMON_FILE), 'w') as f:
    f.write(json.dumps(common_entries))
