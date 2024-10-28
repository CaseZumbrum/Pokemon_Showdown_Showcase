import json
import requests
import re

formats = ["zu", "pu", "nu", "ru", "uu", "ou", "ubers", "ag"]
gens = [7,6,5,4,3,2,1]

# formats = ["pu"]

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
                        print("FAILED TO FIND A THING")
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
                            
                            l = g["log"]
                            
                            start_ind = l.find("clearpoke")
                            if(start_ind == -1):
                                print("Using a format I dont know")
                                continue
                            p1 = []
                            p2 = []
                            
                            # t1 = l.find("teamsize") + 12
                            # t2 = l.find("teamsize", t1) + 12
                            
                            # if(t2 != "6" or t1 != "6"):
                            #     continue
                            
                            for i in range(6):
                                start_ind = l.find("p1|", start_ind) + 3
                                end_ind = l.find("|", start_ind)
                                p1.append(l[start_ind : end_ind])
                                start_ind=end_ind
                            for i in range(6):
                                start_ind = l.find("p2|", start_ind) + 3
                                end_ind = l.find("|", start_ind)
                                p2.append(l[start_ind : end_ind])
                                start_ind=end_ind
                            
                            
                            if "players" in g.keys():
                                data.append({"p1": {"name" : g["players"][0], "pokemon": p1}, "p2": {"name" : g["players"][1], "pokemon": p2}})
                            elif "p1" in g.keys() and "p2" in g.keys():
                                data.append({"p1": {"name" : g["p1"], "pokemon": p1}, "p2": {"name" : g["p2"], "pokemon": p2}})
                            else:
                                print("not finding players")
                                continue
                            count += 1
                            print(count)       
                except:
                    print("failed on page")
                    continue
            except:
                print(f"failed on gen/format {gen}/{format}")
                continue
        with open("data2.json", "w") as f:
            json.dump(data, f)  



