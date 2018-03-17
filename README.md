# Kode med data eller data og kode?
Slides for lyntale under Iterakonferansen 2018.

## Sammendrag
Det hender rett som det er at data sniker seg inn i kildekoden, og noen ganger
hadde de dataene kanskje egnet seg bedre i en databasetabell. Derfor skal jeg
vise deg hvordan du kan gå andre veien og plukke dataen dine ut av koden, kun
behjulpet av noen linjer javascript og en god, gammeldags parser.

Det virker kanskje åpenbart - kode er data, men ikke all data er like godt egnet
som kildekode. Dessverre er det ikke alltid like lett å peke på hvilke deler av
dataene som bør få lov å være data og hvilke som bør være kode når et prosjekt
så vidt har kommet i gang. Kanskje endrer kravene seg, eller kanskje blir det
mer kode med samme struktur enn du først tenkte.

Når du senere skal refaktorere koden for å gjøre den lettere å jobbe med er et
av grepene du kan ta å trekke dataene ut av koden og i stedet skrive koden så
den jobber med dataene; med andre ord en form for generalisering. Dette høres
kanskje arbeidskrevende og kjedelig ut, men slik trenger det altså ikke alltid å
være.

Med de rette verktøyene kan du spare deg det manuelle arbeidet og overlate
oppgaven til datamaskinen. Jeg tar utgangspunkt i en React-applikasjon med mye
data og viser deg hvordan du kan bruke javascript-parseren Esprima og noen få
linjer kode til å trekke dataene dine ut i JSON-filer. Og tro meg – de linjene
med kode er vanvittig mye morsommere å skrive enn JSON-filer.
