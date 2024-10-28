import json

with open("data.json", "r", encoding="utf-8") as f:
    d = json.load(f)

with open("pokemon.json", "r", encoding="utf-8") as f:
    pokedex = json.load(f)
    
def check(d):
    for pokemon in d:
        if '\n' in pokemon:
            return False
        if pokemon == "": 
            return False
    return True


count = 0
p = {}
l = []
for game in d:
    for player in game:
        if(check(game[player]["pokemon"])):
            for pokemon in game[player]['pokemon']:
                if pokemon.find(",") != -1:
                    pokemon = pokemon[0:pokemon.find(",")]
                if pokemon.find("-") != -1:
                    pokemon = pokemon[0:pokemon.find("-")]
                if pokemon not in pokedex:
                    # print(pokemon)
                    if pokemon not in l:
                        l.append(pokemon)
                elif pokemon in p:
                    count += 1
                    p[pokemon] += 1
                else:
                    count += 1
                    # print(pokemon)
                    p[pokemon] = 1
    
# with open("usage.json", "w") as f:
#     json.dump(p, f)

max = 0
max_name = ""
for pokemon in p:
    if p[pokemon] > max:
        max = p[pokemon]
        max_name = pokemon

print(max_name, max)