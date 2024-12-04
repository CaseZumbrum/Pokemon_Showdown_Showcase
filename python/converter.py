import json

with open("data.json", "r", encoding="utf-8") as f:
    d = json.load(f)

with open("pokemon.json", "r", encoding="utf-8") as f:
    pokedex = json.load(f)

# check if a pokemon is valid    
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
# for each game and player
for game in d:
    for player in game:
        # check if a pokemon is valid
        if(check(game[player]["pokemon"])):
            for pokemon in game[player]['pokemon']:
                if pokemon.find(",") != -1:
                    pokemon = pokemon[0:pokemon.find(",")]
                if pokemon.find("-") != -1:
                    pokemon = pokemon[0:pokemon.find("-")]
                    
                # add usage data to the pokemon
                if pokemon not in pokedex:
                    if pokemon not in l:
                        l.append(pokemon)
                elif pokemon in p:
                    count += 1
                    p[pokemon] += 1
                else:
                    count += 1
                    # print(pokemon)
                    p[pokemon] = 1
    
# save the data
with open("usage.json", "w") as f:
    json.dump(p, f)

# FOR ANALYSIS ONLY
# max = 0
# max_name = ""
# count = 0
# for pokemon in p:
#     count += p[pokemon]
#     if p[pokemon] > max:
#         max = p[pokemon]
#         max_name = pokemon

# print(max_name, max, count, len(p))