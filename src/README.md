# invoice-generator

Navodila za zagon:

## 1. Kloniranje repozatorija

## 2. V terminalu prosim navigirajte v "src" folder projekta

## 3. "npm install"

## 4. "node server.js" za zagon serverja

## 5. "npm start" v novem terminalu za zagon aplikacije

Aplikacija bi morala biti vidna na portu:3000


# Uporaba: 

### Na domači strani se prikaže trenutni račun klican iz API-ja
### s klikom na gumb "uredi račun" lahko spremenimo katerikoli podatek v računu. 
### Gumb "zgodovina računov" zrendra vse potrjene račune pod našim trenutnim računom, ki so shranjeni v local storage. Če še nimamo računov v local storage, mora javit "nimate preteklih računov". (Ko shranimo nov račun, moramo najprej osvežiti stran in ponovno pritisniti "zgodovina računov", da se ta račun prikaže pod preteklimi računi.)
### Če kliknemo na katerikoli pretekli račun, bo ta račun nadomestil trenutni račun
### Z gumbom "potrdi"pošljem račun na local storage in pa hkrati nazaj na server



Opomba: Zgodovina računov se iz nekega razloga ne zrendra v "Brave" brskalniku, vendar pa deluje v Firefox-u in Chrome-u. 
Tehnologije: React, vanilla javascript, Tailwind, Express
