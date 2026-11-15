# Solar Storm

Statička stranica za Solar Storm d.o.o., Zagreb: prodaja, montaža i servis klima uređaja. Sav tekst je na hrvatskom. Nema koraka izgradnje — dovoljni su HTML, CSS i JavaScript.

Stranica je predložak. Prije javne objave zamijenite oznake u uglatim zagradama. Na njoj nema cijena, brojeva modela, specifikacija, telefona, ulice, certifikata ni recenzija.

## Pokretanje

Otvorite `index.html` u pregledniku ili poslužite mapu lokalno:

```bash
python3 -m http.server 8941
```

Zatim otvorite [http://127.0.0.1:8941](http://127.0.0.1:8941).

## Što zamijeniti

Potražite ove oznake u `index.html` i u podnožju `pravne.html`:

| Oznaka | Gdje | Što upisati |
| --- | --- | --- |
| `[EMAIL]` | kontakt, podnožje, mobilni izbornik nema e-poštu | Adresa na koju stižu upiti. Obrazac čita tekst elementa `#contact-email`. |
| `[TELEFON]` | kontakt, podnožje, mobilni izbornik | Broj telefona. |
| `[ADRESA]` | kontakt, podnožje, odjeljak „Zašto mi” | Ulica i broj. Grad (Zagreb) već piše. |
| `[CIJENA]` | kartice brendova i uvod tog odjeljka | Iznos ili cijelu rečenicu uklonite ako cijenu ne želite na stranici. |

Kad `[EMAIL]` postane prava adresa (sadrži `@` i nema uglate zagrade), gumb „Pošaljite upit” otvara program za e-poštu. Do tada obrazac samo složi tekst upita i nudi kopiranje. Podaci se ne šalju na poslužitelj.

## Brend Haier

Haier još nije potvrđen. Kartica ima `data-brand="haier"` i oznaku „Na potvrdi”. Da je preimenujete, u `index.html` promijenite:

1. `data-brand`
2. naslov `<h3>`
3. opis
4. poveznicu „Pošaljite upit…”
5. rečenicu u uvodu odjeljka Brendovi, ako tamo još piše Haier

Isto vrijedi za Tesla, Mitsubishi i Maxon. Logotipi brendova nisu korišteni — samo imena.

## Pravne stranice

`pravne.html` ima prazne odjeljke Uvjeti, Privatnost i Kolačići. Trenutačna stranica ne postavlja kolačiće. Tekstove upisuje vlasnik; nemojte ostaviti predložak na javnoj adresi.

## Objava na GitHub Pages

1. Gurnite ovu granu u GitHub repozitorij.
2. U repozitoriju otvorite **Settings → Pages**.
3. Pod **Build and deployment** odaberite **Deploy from a branch**.
4. Branch: grana s ovim datotekama, mapa **`/ (root)`**.
5. Spremite. Nakon minutu-dvije stranica je na `https://<korisnik>.github.io/<repo>/`.

Datoteka `.nojekyll` sprječava da Jekyll dira statičke datoteke. Ne treba poseban build.

Ako stranica živi u podmapi (`github.io/ime-repo/`), relativne putanje (`css/styles.css`, `images/…`) i dalje rade. Ne stavljajte kose crte na početak putanja.

Stranicu nemojte objavljivati dok oznake `[EMAIL]`, `[TELEFON]`, `[ADRESA]` i `[CIJENA]` nisu zamijenjene ili svjesno uklonjene.

## Fotografije

Slike su s Pexelsa, licenca Pexels (besplatno korištenje, uključujući komercijalno). Na fotografijama nema logotipa Tesla, Mitsubishi, Haier ni Maxon.

| Datoteka | Autor | Izvor |
| --- | --- | --- |
| `images/hero-ustedba.jpg` | Nevtuğ Yalçın | https://www.pexels.com/photo/39318564/ |
| `images/hero-tiho.jpg` | NEOSiAM | https://www.pexels.com/photo/38788452/ |
| `images/hero-montaza.jpg` | José Andrés Pacheco Cortes | https://www.pexels.com/photo/5463587/ |
| `images/banner-prodaja.jpg` | Max Vakhtbovych | https://www.pexels.com/photo/7546721/ |
| `images/banner-rad.jpg` | José Andrés Pacheco Cortes | https://www.pexels.com/photo/6471914/ |
| `images/banner-savjet.jpg` | Barion McQueen | https://www.pexels.com/photo/5002323/ |

## Font

Lato (Light 300, Regular 400, Bold 700, Heavy 900) samostalno je poslužen iz `fonts/`. Licenca je SIL Open Font License 1.1, tekst je u `fonts/OFL.txt`. Autori: Łukasz Dziedzic i tim, tyPoland. Rezervirano ime fonta: „Lato”.
