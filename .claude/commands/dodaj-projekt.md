---
description: Dodaje grę do portfolio – wywiad, skan materiałów, wygenerowanie project.md
argument-hint: [slug-gry]
---

Dodajemy do portfolio grę: **$ARGUMENTS**

Przestrzegaj zasad z `CLAUDE.md`. Używaj tylko tego, co powiem, i tego, co znajdziesz w plikach.

## Krok 1 – Folder i materiały
1. Sprawdź, czy istnieje `projects/$ARGUMENTS/`. Jeśli nie, zaproponuj utworzenie struktury (`media/`, `media/screens/`) i poczekaj na zgodę.
2. Przeskanuj `projects/$ARGUMENTS/media/` i pokaż krótkie podsumowanie: co jest okładką, ile screenów, czy jest wideo.
3. Sprawdź materiały względem wymagań z `CLAUDE.md` (format, proporcje, rozmiar, orientacja). Wypisz odstępstwa, niczego nie poprawiaj.

## Krok 2 – Wywiad
Zadawaj pytania po kolei, JEDNO naraz, i czekaj na odpowiedź. Krótkie odpowiedzi przyjmuj bez dopytywania, chyba że brakuje czegoś wymaganego.

1. Jak nazywa się gra i jak opisał(a)byś ją jednym zdaniem?
2. Status: wydana, w produkcji, prototyp czy wycofana? Kiedy wyszła (rok-miesiąc)?
3. Platformy i silnik/narzędzia?
4. Gatunek i model monetyzacji?
5. Ile osób pracowało nad grą i ile to trwało?
6. Co konkretnie Ty robiłeś w tym projekcie?
7. Jaki był największy problem techniczny, projektowy lub produkcyjny? Jak go rozwiązałeś i co z tego wyszło?
8. Czy była jeszcze jedna ważna decyzja (np. zmiana mechaniki, cięcie zakresu)? Co ją wywołało i jaki dała efekt?
9. Jakie masz twarde wyniki (pobrania, retencja, oceny, przychód, nagrody)? Dla każdej liczby: okres i źródło.
10. Czego się nauczyłeś, co zrobił(a)byś inaczej? (opcjonalnie)
11. Linki: sklepy, trailer na YouTube/Vimeo.

## Krok 3 – Materiały
- Dla każdej grafiki w `media/` zapytaj o alt-tekst (opis tego, co widać) i opcjonalny podpis. Zaproponuj roboczy opis na podstawie obrazu i poproś o akceptację lub poprawkę.
- Jeśli brakuje okładki lub jest mniej niż 3 screeny, zgłoś to wprost.

## Krok 4 – Wygenerowanie wpisu
1. Utwórz `projects/$ARGUMENTS/project.md` według schematu i układu sekcji z `CLAUDE.md`.
2. Frontmatter wypełnij danymi z wywiadu i listą plików z `media/`. Braki oznacz `TODO: do uzupełnienia`.
3. Treść napisz moim głosem (pierwsza osoba), w oparciu wyłącznie o odpowiedzi z wywiadu.

## Krok 5 – Walidacja i podsumowanie
- Uruchom walidację z `CLAUDE.md` i wypisz, czego brakuje.
- Jeśli są braki, ustaw `draft: true`.
- Pokaż mi gotowy wpis do przeglądu.
- NIE rób commita ani pusha. Zapytaj, czy chcę opublikować.
