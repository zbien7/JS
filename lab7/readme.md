## Pogodynka
Pamiętasz notekeep? Użyj ponownie części swojego kodu do tego ćwiczenia.  

### Wersja Śledzik: 
1. Aplikacja prezentuje pogodę z różnych miejsc na świecie (temp, wilgotność, odpowiednia grafika względem pogody  np. chmurka, słoneczko, deszcz, śnieg etc). 
1. Wskazane przez użytkownika miejsca (nazwy miejscowości) powinny byc zapamiętane (localStorage), pogoda pobierana na nowo przy każdym wejściu do aplikacji.
1. Można dodawać/usuwać do dziesięciu miejsc.

### Wersja Karpik:
1. Automatyczna aktualizacja pogody co 5min. 
1. Wyniki zapisywane w cache (localStorage). 
1. Przy odświeżeniu strony wyniki wczytywane z cache lub z api (tylko jeśli minęło 5min od ostatniej aktualizacji lub cache jest pusty).


### Wersja "Last christmas I gave you...": 
1. Wykres pogody godzinowej (np. najblizsze 12 godzin) dla wybranej przez użytkownika lokalizacji.
1. Podpowiadanie miast z autouzupełnianiem z api.


### Przydamisie:
Do pobrania danych pogodowych mozesz wykorzystac serwis openweathermap  
ikony:  https://openweathermap.org/weather-conditions
Przykładowe Api miast: Google Places API, http://geodb-cities-api.wirefreethought.com/demo  
Wykresy: Chart.js, D3.js