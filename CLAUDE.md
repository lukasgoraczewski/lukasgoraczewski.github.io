# Portfolio gier – zasady dla Claude Code

Portfolio zawiera wyłącznie gry. Każda gra to osobny folder w `projects/`.
Treść powstaje na podstawie wywiadu z właścicielem, a materiały (grafiki, wideo) dostarcza on sam.

## Zasada nadrzędna
- Używaj WYŁĄCZNIE informacji, które podał właściciel w wywiadzie lub które widać w plikach projektu.
- Nie zmyślaj liczb, dat, nagród, nazw silników, ról ani wyników. Brakujące dane, które właściciel jeszcze poda, zapisz jako `TODO: do uzupełnienia`.
- Dane, które właściciel świadomie pominął (np. „pomiń", „nieistotne"), zapisz jako `pominięte`. Nie pytaj o nie ponownie i nie pokazuj ich na stronie.
- Nie poprawiaj po cichu materiałów ani treści. Zgłaszaj problem i pytaj.

## Struktura repozytorium
```
projects/
  nazwa-gry/            ← slug: małe litery, myślniki, bez polskich znaków
    project.md          ← wpis (frontmatter + treść)
    media/
      cover.png         ← okładka (wymagana)
      screens/          ← screeny (min. 3)
      trailer.mp4       ← opcjonalnie; lub link w frontmatterze
```

## Schemat frontmattera (project.md)
```yaml
title: ""              # nazwa gry
slug: ""               # = nazwa folderu
tagline: ""            # jedno zdanie, max 120 znaków
status: ""             # wydana | w produkcji | prototyp | wycofana
release_date: ""       # RRRR-MM, TODO lub pominięte
platforms: []          # np. iOS, Android
engine: ""             # silnik/narzędzia
genre: ""
monetization: ""       # np. premium, F2P/reklamy, IAP, TODO lub pominięte
team_size: 0
role: ""               # co konkretnie robił właściciel
duration: ""           # czas produkcji
links:
  store_ios: ""
  store_android: ""
  trailer_url: ""      # YouTube/Vimeo
metrics:               # tylko dane podane przez właściciela
  - label: ""
    value: ""
    source: ""         # skąd liczba (np. App Store Connect, okres) lub pominięte
media:
  cover: ""
  screens: []
  trailer_file: ""
alt_texts: {}          # plik → opis (wymagane dla każdej grafiki)
captions: {}           # plik → podpis (opcjonalne)
```

## Układ treści wpisu (kolejność sekcji)
1. **O grze** – 2–3 zdania: co to jest i dla kogo.
2. **Moja rola** – konkretnie, co zrobił właściciel.
3. **Wyzwania i decyzje** – 2–4 punkty: problem → decyzja → efekt.
4. **Efekty** – tylko liczby podane przez właściciela, z okresem i źródłem.
5. **Czego się nauczyłem** – opcjonalnie, 1–3 zdania.

Sekcje, które właściciel pominął, zostają w pliku z wartością `pominięte` i nie trafiają na stronę.

## Ton i długość
- Pierwsza osoba, rzeczowo, bez marketingowych przymiotników („rewolucyjny", „niesamowity").
- Całość wpisu: 200–400 słów.
- Wynik zawsze z kontekstem (liczba + okres + źródło).

## Wymagania dla materiałów
- Okładka: PNG lub WebP, proporcje [DO USTALENIA, np. 16:9], min. [DO USTALENIA] px szerokości.
- Screeny: ta sama orientacja w obrębie jednej gry, min. 3 sztuki.
- Wideo: do [DO USTALENIA] MB w repo; cięższe → YouTube/Vimeo i link w `trailer_url`.
- Każda grafika musi mieć alt-tekst.
- Nazwy plików: małe litery, myślniki.

## Walidacja (wpis jest niekompletny, jeśli)
- brakuje okładki lub alt-tekstu którejkolwiek grafiki,
- jest mniej niż 3 screeny,
- `slug` nie zgadza się z nazwą folderu,
- w `title`, `status`, `platforms` lub `role` jest `TODO` albo brak wartości (tych pól nie można pominąć),
- jakiekolwiek inne pole albo sekcja ma `TODO` (czyli właściciel jeszcze nie zdecydował).
Pola i sekcje oznaczone `pominięte` nie czynią wpisu niekompletnym, także liczby w `metrics` bez źródła, jeśli właściciel zdecydował, że źródło pomija.
Niekompletny wpis oznacz `draft: true` i wypisz właścicielowi, czego brakuje. Wpis bez żadnych braków nie ma `draft`.

## Czego nie robić
- Nie generuj, nie przerabiaj i nie kompresuj materiałów właściciela bez pytania.
- Nie zmieniaj istniejących wpisów, o ile polecenie tego nie dotyczy.
- Nie commituj ani nie pushuj bez zgody.
