import json
import requests

formats = ["zu", "pu", "nu", "ru", "uu", "ou", "ubers", "ag"]
gens = [1, 2, 3, 4, 5, 6, 7, 8, 9]

data = []

count = 0

for gen in gens:
    for format in formats:
        print(f"COUNTER: {count}")
        for i in range(1, 100):
            try:
                URL = (
                    "https://replay.pokemonshowdown.com/api/replays/search?username=&format=gen"
                    + str(gen)
                    + "-"
                    + format
                    + "+&page="
                    + str(i)
                )
                try:
                    r = requests.get(url=URL)
                    if r.status_code != 200:
                        break
                    else:
                        games = json.loads(r.text[1:])
                        for game in games:
                            URL = (
                                "https://replay.pokemonshowdown.com/"
                                + game["id"]
                                + ".json"
                            )
                            r = requests.get(url=URL)
                            g = json.loads(r.text)
                            if "players" in g.keys():
                                data.append(g["players"])
                            elif "p1" in g.keys() and "p2" in g.keys():
                                data.append([g["p1"], g["p2"]])
                except:
                    print("failed on page")
                    continue
            except:
                print(f"failed on gen/format {gen}/{format}")
                continue


with open("data.json", "w") as f:
    json.dump(data, f)
