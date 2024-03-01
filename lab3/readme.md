## Drumkit - automat perkusyjny

### Wersja panda3:
- Do klawiszy na klawiaturze "przypnij" możliwość odtwarzania dźwięków instrumentu (pliki dźwiękowe perkusji są w repo, możesz zastosować również dowolne inne)
- Aplikacja ma możliwość nagrywania ścieżki dźwiękowej na 4 osobnych kanałach (zapamiętanie jedynie na czas działania aplikacji)
- Każdy z kanałów można odtworzyć osobno lub wszystkie jednocześnie
- Nagranie po odświeżeniu strony ginie
### Wersja panda4:
- Jednocześnie można odtworzyć jedynie wybrane kanały (np. tylko pierwszy i trzeci)
- Możliwe jest nadpisanie zawartości danego kanału
- Aplikacja posiada wbudowany prosty metronom (on/off, ilość uderzeń na minutę)
### Wersja panda5:
- Ilość kanałów jest dynamiczna (użytkownik może dodawać/kasować kanały)
- Automat może pełnić rolę looper-a. Czyli odtwarzanie kanałów zostaje zapętlone. Pamiętaj że wtedy kanały muszą mieć równą długość (możesz przyjąć czas/takty na sztywno lub user może podać własną wartość)


### Przydatne
> Asynchroniczne wykonanie kodu po określonym czasie:
> ```setTimeout(cb, time)```  
> Reagowanie na zdarzenie:
> ```element.addEventListener(nazwaZdarzenia, callback)```
> Zdarzenia klawiatury: keypress, keydown, keyup  
> Odtwarzanie dźwięku:
> `audioTag.play()`

#### Copyright
- Dźwięki: https://99sounds.org/