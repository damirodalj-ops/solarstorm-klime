# Klimoteka

Statička stranica trgovine Klimoteka (Solar Storm d.o.o., Sesvete): maloprodaja i veleprodaja klima uređaja te ugradnja u Zagrebu i okolici, s dostavom u cijelu Hrvatsku. Sav tekst je na hrvatskom. Nema koraka izgradnje — dovoljni su HTML, CSS i JavaScript.

U odjeljku Brendovi prikazani su odabrani zidni modeli Tesla, Toshiba, Haier i Maxon, sa slikama, nazivom, snagom i opremom iz cjenika odnosno stranica proizvođača. Na stranici nema cijena. Na svim brendovima stoji 5 godina garancije koju daje Solar Storm.

Logo (tri valovite crte zraka uz natpis Klimoteka, petrol #0D4539) stoji u zaglavlju kao SVG. U tamnom podnožju koristi se bijela verzija. Favicon je `favicon.ico`, uz `images/klimoteka-ikona-192.png` i `images/klimoteka-ikona-512.png` za apple-touch-icon.

## Pokretanje

Otvorite `index.html` u pregledniku ili poslužite mapu lokalno:

```bash
python3 -m http.server 8941
```

Zatim otvorite [http://127.0.0.1:8941](http://127.0.0.1:8941).

## Kontakt i obrazac

Kontakt (adresa, telefon, e-pošta) upisan je u `index.html` i `pravne.html`. Gumb „Pošaljite upit” otvara program za e-poštu. Podaci se ne šalju na poslužitelj. Upit za veleprodaju ima zaseban mailto s naslovom „Veleprodaja”.

## Modeli

Kartica pokazuje sliku, seriju, model, snagu hlađenja i kratko obilježje. Cijena nije navedena. Jamstvo na karticama: 5 godina za sve brendove.

## Pravne stranice

`pravne.html` ima prazne odjeljke Uvjeti, Privatnost i Kolačići. Trenutačna stranica ne postavlja kolačiće. Tekstove upisuje vlasnik; nemojte ostaviti predložak na javnoj adresi.

## Objava na GitHub Pages

Stranica je namijenjena GitHub Pages repozitoriju `damirodalj-ops/solarstorm-klime`. Datoteka `.nojekyll` sprječava da Jekyll dira statičke datoteke. Relativne putanje (`css/styles.css`, `images/…`) rade i u podmapi. Cijene ne stavljajte na stranicu. Domenu i objavu odobrava vlasnik.

## Fotografije

Životne stock fotografije (Pexels) uklonjene su s redizajna. Slike modela spremljene su u `images/models/`. To su službene fotografije proizvođača ili distributera, smanjene na širinu do 800 px i spremljene kao WebP. Ista fotografija serije koristi se za više snaga iste serije kad proizvođač nema posebnu sliku za svaki kapacitet.

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

## Fontovi

Lato (Light 300, Regular 400, Bold 700, Heavy 900) koristi se za tekst. Space Grotesk (Medium 500, Semibold 600, Bold 700) koristi se za naslove i wordmark. Oba su samostalno poslužena iz `fonts/`, pod licencom SIL Open Font License 1.1. Tekst licence za Lato je u `fonts/OFL.txt`, za Space Grotesk u `fonts/space-grotesk-OFL.txt`. Autori Lata: Łukasz Dziedzic i tim, tyPoland (rezervirano ime: „Lato”). Autori Space Groteska: The Space Grotesk Project Authors (https://github.com/floriankarsten/space-grotesk).
