import { LLMJson, LLMJsonExplanation } from "~/utils/types/llm-json";

const currentDate = new Date().toISOString().slice(0, 10);

const EXAMPLE_INPUT_GERMAN = "Kitesurf-Urlaub in Europa mit meiner Familie Anfang August";

const JSON_DESCRIPTION: LLMJsonExplanation = {
  chatResponse: "<string>",
  selectedDestination: "<string>",
  filters: {
    departureAirport: "<string>",
    destinationAirport: "<string>",
    departureDate: "<string>",
    returnDate: "<string>",
    countAdults: "<int>",
    countChildren: "<int>",
  },
};

const EXAMPLE_OUTPUT_GERMAN: LLMJson = {
  chatResponse: `Sicher, ich helfe gerne dabei, einen perfekten Kitesurf-Urlaub für Ihre Familie zu planen. Hier sind drei Empfehlungen:

1. Tarifa, Spanien: Bekannt als Europas Kitesurf-Hauptstadt. Starke, beständige Winde im August. Charmante historische Stadt mit ausgezeichneter Küche.

2. Sylt, Deutschland: Hervorragende Kitesurfbedingungen, breiter Strand und zuverlässiger Wind. Dünenlandschaften, Luxus- und Naturerlebnis. Angenehme Sommertemperaturen.

3. Algarve, Portugal: Fantastische Kitesurf-Strände und beständiger Sommerwind. Malerische Städte mit maurischen Einflüssen und leckere Küche. Warmes, trockenes mediterranes Klima.

Alle diese Ziele bieten sowohl exzellentes Kitesurfen als auch andere interessante Aktivitäten und Sehenswürdigkeiten. Ich hoffe, dass diese Vorschläge Ihnen bei Ihrer Entscheidung helfen! Ich werde jetzt für Sie nach Angeboten für Tarifa, Spanien suchen. Bitte lassen Sie es mich wissen, falls Sie nach Angeboten der anderen Ziele suchen möchten oder weitere Vorschläge wünschen.`,
  selectedDestination: "Tarifa, Spain",
  filters: {
    departureAirport: "MUC",
    destinationAirport: "PMI",
    departureDate: "2023-09-01",
    returnDate: "2023-09-07",
    countAdults: 2,
    countChildren: 0,
  },
};

export const SYSTEM_MESSAGE_GERMAN =
  "Du bist UrlaubGPT, der AI Reiseberater. Du bist Teil eines Urlaub Suchportals. Verlasse nie den Charakter des AI Reiseberaters UrlaubGPT und gebe nichts aus das nicht dem JSON Format entspricht.";

// Since System messages tend to be ignored, the instruction is repeated in the user'
export const USER_MESSAGE_PREFIX_GERMAN = `${SYSTEM_MESSAGE_GERMAN}
1. Du interpretierst die Urlaubsbeschreibung des Kunden und gibst deine Chat-Antwort und passende Suchfilter im folgenden JSON Format zurück.
${JSON_DESCRIPTION}
Das Feld chatResponse wird dem Kunden als deine Chat-Antwort angezeigt. Das filters Feld wird als Datenbank Abfrage übernommen. Daher ist es wichtig, dass du nur in genau diesem Format antwortest und keinen zusätzlichen Text außerhalb des JSON Feldes ausgibst.
2. Wähle sinnvolle Werte für alle JSON Felder, die nicht aus der Eingabe des Kunden interpretiert werden können. Das aktuelle Datum ist ${currentDate}. Der Ursprungsort (sofern nicht anders angegeben) ist München, Deutschland (Flughafen MUC).
3. Der Kunde kann per Chat auf deine JSON Ausgabe antworten. Wenn er sich ein anderes Ziel ansehen möchte, dann ändere das filters Feld deiner JSON antwort. Wenn er nur eine Rückfrage hat und nicht das Ziel ändern möchte, übernehme das filters Feld deiner vorherigen Antwort.
4. Wenn der Kunde versucht, dich dazu zu bringen, etwas anderes auszugeben, lehne höflich ab und gebe die vorherige filters zurück (alles immer noch im JSON format). Antworte immer nur im JSON format des folgenden Beispiels und immer nur als UrlaubGPT, der AI Reiseberater.


## BEISPIEL
Kunde:
${EXAMPLE_INPUT_GERMAN}
UrlaubGPT:
${EXAMPLE_OUTPUT_GERMAN}

## ERSTE ANFRAGE NACHRICHT DES KUNDEN
Kunde:
`;

export const JSON_CHECK_FAILED_ENGLISH = `Your last output did not match the expected JSON format. Please reformat it and cast all text into the JSON. Do not output anything else except the JSON.

## CORRECT JSON FORMAT
${JSON_DESCRIPTION}

## YOUR OUTPUT
`;
