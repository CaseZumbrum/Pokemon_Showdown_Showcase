import json
import requests

# list of all formats
formats = ["zu", "pu", "nu", "ru", "uu", "ou", "ubers", "ag"]
# list of all generations
gens = [7,6,5,4,3,2,1]

# data store stores the pokemon used in each battle
data = []

count = 0

# for all combos of gen + format
for gen in gens:
    for format in formats:
        print(f"COUNTER: {count}")
        # Pokemon Showdown only provides access to 100 pages for each gen+format
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
                        # games is a list of games retrieved
                        games = json.loads(r.text[1:])
                        for game in games:
                            # get data from each game
                            URL = (
                                "https://replay.pokemonshowdown.com/"
                                + game["id"]
                                + ".json"
                            )
                            r = requests.get(url=URL)
                            g = json.loads(r.text)
                            
                            l = g["log"]
                            # string parsing
                            start_ind = l.find("clearpoke")
                            if(start_ind == -1):
                                print("Using a format I dont know")
                                continue
                            p1 = []
                            p2 = []
                            
                            # get the 6 pokemon for each player
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
                            
                            # add the pokemon to the list
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



