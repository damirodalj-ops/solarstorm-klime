# Solar Storm

Statička stranica za Solar Storm d.o.o., Zagreb: prodaja, montaža i servis klima uređaja. Sav tekst je na hrvatskom. Nema koraka izgradnje — dovoljni su HTML, CSS i JavaScript.

Kontaktni podaci su upisani. U odjeljku Brendovi prikazani su odabrani zidni modeli Tesla, Toshiba, Haier i Maxon, sa slikama i kratkim obilježjima iz cjenika odnosno stranica proizvođača. Na stranici nema cijena.

## Pokretanje

Otvorite `index.html` u pregledniku ili poslužite mapu lokalno:

```bash
python3 -m http.server 8941
```

Zatim otvorite [http://127.0.0.1:8941](http://127.0.0.1:8941).

## Kontakt i obrazac

Kontakt (adresa, telefon, e-pošta) upisan je u `index.html` i `pravne.html`. Kad je adresa u `#contact-email` ispravna, gumb „Pošaljite upit” otvara program za e-poštu. Podaci se ne šalju na poslužitelj.

## Modeli

U odjeljku Brendovi svaki brend ima automatski vrtuljak modela (strelice, točke, listanje prstom na mobitelu, bez vanjskih biblioteka). Kartica pokazuje sliku, seriju, model, snagu hlađenja i kratko obilježje. Cijena nije navedena.

Jamstvo na karticama prati izvor: Haier i Maxon 5 (3+2) godina (Maxon uz registraciju), Toshiba 3 godine, Tesla 36 mjeseci prema tesla.info.

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

Kontaktni podaci su već upisani. Cijene ne stavljajte na stranicu.

## Fotografije

Slike su s Pexelsa, licenca Pexels (besplatno korištenje, uključujući komercijalno). Na fotografijama nema logotipa Tesla, Toshiba, Haier ni Maxon.

| Datoteka | Autor | Izvor |
| --- | --- | --- |
| `images/hero-ustedba.jpg` | Nevtuğ Yalçın | https://www.pexels.com/photo/39318564/ |
| `images/hero-tiho.jpg` | NEOSiAM | https://www.pexels.com/photo/38788452/ |
| `images/hero-montaza.jpg` | José Andrés Pacheco Cortes | https://www.pexels.com/photo/5463587/ |
| `images/banner-prodaja.jpg` | Max Vakhtbovych | https://www.pexels.com/photo/7546721/ |
| `images/banner-rad.jpg` | José Andrés Pacheco Cortes | https://www.pexels.com/photo/6471914/ |
| `images/banner-savjet.jpg` | Barion McQueen | https://www.pexels.com/photo/5002323/ |


Slike modela spremljene su u `images/models/`. To su službene fotografije proizvođača ili distributera, smanjene na širinu do 800 px i spremljene kao WebP. Ista fotografija serije koristi se za više snaga iste serije kad proizvođač nema posebnu sliku za svaki kapacitet.

| Datoteka | Izvor |
| --- | --- |
| `images/models/tesla-ta36ffcl.webp` | https://tesla.info/wp-content/uploads/2021/05/TA_FC_front.jpg — stranica modela https://tesla.info/hr/klima-uredjaji/ta36ffcl-1232iaw/ |
| `images/models/tesla-tt37af.webp` | https://tesla.info/wp-content/uploads/2022/02/TT_Virtuoso-FreshAir-AF11-front-2.jpg — stranica modela (hrvatski URL preusmjerava na englesku) https://tesla.info/en/air-conditioning/tt37af-1232iaw/ |
| `images/models/tesla-ta53fful.webp` | https://tesla.info/wp-content/uploads/2021/05/TA_FU_front_02.jpg — stranica modela https://tesla.info/hr/klima-uredjaji/ta53fful-1832iaw/ |
| `images/models/tesla-tt51tp81.webp` | https://tesla.info/wp-content/uploads/2023/09/tt34tp81-3.jpg.jpg — službena stranica modela TT51TP81-1832IHWT koristi fotografije serije Advance TP81: https://tesla.info/hr/klima-uredjaji/tt51tp81-1832ihwt/ |
| `images/models/tesla-tt68tp21.webp` | https://tesla.info/wp-content/uploads/2023/06/TT_TP21-front.jpg — stranica modela https://tesla.info/hr/klima-uredjaji/tt68tp21-2432iaw/ |
| `images/models/toshiba-daiseikai-10-wood.webp` | https://www.toshiba-aircondition.com/b88d20f74d2e4d874e9762da89de94c7.jpg — stranica serije https://www.toshiba-aircondition.com/en/air-conditioning-systems-for-private-users/product-detail-home/daiseikai-10-wood-144 (ista slika serije za 2,5 / 3,5 / 5,0 kW) |
| `images/models/toshiba-shorai-edge-black.webp` | Isječak službene fotografije iz brošure Toshiba „Vaš dom, vaša klima”, https://www.toshiba.hr/wp-content/uploads/2024/03/HOME_RAS_Broschuere_2024_HR_WEB.pdf, stranica 20 (Shorai Edge Black) |
| `images/models/haier-revive-plus.webp` | https://haierhvac.eu/sites/haierhvac-eu/files/2024-06/REVIVE.png — stranica https://haierhvac.eu/products/residential-light-commercial-monosplit-light-commercial-monosplit/revive-plus-monosplit (ista slika serije za 2,7 / 3,5 / 4,8 kW) |
| `images/models/haier-flexis-plus-crna.webp` | https://haierhvac.eu/sites/haierhvac-eu/files/2023-10/FLEXIS-plus-img-2-opt_1.jpg — stranica https://haierhvac.eu/products/residential-light-commercial-monosplit-light-commercial-monosplit/flexis-plus-monosplit (ista slika serije za 2,6 / 5,2 / 7,0 kW) |
| `images/models/haier-expert-nordic.webp` | https://haierhvac.eu/sites/haierhvac-eu/files/2024-01/Expert%20-%20frontale%20chiusa.png — stranica https://haierhvac.eu/products/residential-light-commercial-monosplit-light-commercial-monosplit/expert-nordic-monosplit |
| `images/models/haier-pearl-premium.webp` | https://haierhvac.eu/sites/haierhvac-eu/files/2024-06/Pearl_1.jpg — stranica https://haierhvac.eu/products/residential-light-commercial-monosplit-light-commercial-monosplit/pearl-premium-monosplit |
| `images/models/maxon-fresh.webp` | Službena fotografija serije Fresh iz cjenika Maxon klima uređaji 2026., MB Frigo, verzija 13. 5. 2026. Ista slika serije za sve četiri prikazane snage. |

## Font

Lato (Light 300, Regular 400, Bold 700, Heavy 900) samostalno je poslužen iz `fonts/`. Licenca je SIL Open Font License 1.1, tekst je u `fonts/OFL.txt`. Autori: Łukasz Dziedzic i tim, tyPoland. Rezervirano ime fonta: „Lato”.
