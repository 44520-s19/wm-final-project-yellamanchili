from bs4 import BeautifulSoup
import pickle
soup = BeautifulSoup(open("C:\premireLeague_2016-2017.html", encoding="utf8"), "html.parser")
list = soup.find_all('tr')
playersList = {
        "data": []
    };
count = 0
for l in list[1:]:
    count=count + 1
    print(count)
    print("            ")
    playerName = l.find('a',class_="playerName").text
    print(playerName)
    position = l.find('td',class_="hide-s").text
    print(position)
    playerCountry = l.find('span',class_="playerCountry").text
    print(playerCountry)
    print("            ")
    details = {
                    "Name" : playerName,
                    "Position" : position,
                    "Player Country" : playerCountry,
                }
    playersList['data'].append(details)

with open('players_list_2016-2017.pkl', 'wb') as f:
    pickle.dump(playersList,f,protocol=pickle.HIGHEST_PROTOCOL)
