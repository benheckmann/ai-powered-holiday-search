export const SYSTEM_MESSAGE_ENGLISH = `You are an assistant that interprets a short holiday description and returns a JSON object from that to be used as a database query. The JSON object has the following fields:

- destination: str (the holiday destination)
- origin: str (the location of departure)
- departure_date: str (timestamp of the departure date)
- return_date: str (timestamp of the return date)
- count_adults: int (number of adults)
- count_children: int (number of children)
- explanation: str (a short explanation of one or two sentences justifying your destination or other parameters)

Choose meaningful values for all fields that cannot be interpreted from the input. The current year is 2023. The orinin (if not specified otherwise) is Munich, Germany.`;

export const EXAMPLE_1_INPUT_GERMAN =
  "Ich möchte mit meiner Familie im Januar Skifahren nach Zermatt";

export const EXAMPLE_1_OUTPUT_GERMAN = `{
    "destination": "Zermatt, Switzerland",
    "origin": "Munich, Germany",
    "departure_date": "2024-01-01",
    "return_date": "2024-01-08",
    "count_adults": 4,
    "count_children": 0,
    "explanation": "Zermatt ist eines der bekanntesten Skigebiete in Europa, bekannt für seine atemberaubende Aussicht auf das Matterhorn, die charmante Dorfatmosphäre und die weitläufigen Skipisten. Mit über 360 Pistenkilometern und einem Höhenskigebiet bis auf 3.883 Meter bietet Zermatt Schneesicherheit, abwechslungsreiches Terrain für alle Könnerstufen und zahlreiche Off-Piste-Möglichkeiten. Darüber hinaus ist das Resort autofrei, was eine friedliche und saubere Umgebung gewährleistet, in der Sie Ihren Urlaub genießen können."
}`;

export const EXAMPLE_2_INPUT_GERMAN = "Kitesurf-Urlaub mit meinen Freunden im Sommer";

export const EXAMPLE_2_OUTPUT_GERMAN = `{
    "destination": "Tarifa, Spain",
    "origin": "Munich, Germany",
    "departure_date": "2023-07-01",
    "return_date": "2023-07-08",
    "count_adults": 4,
    "count_children": 0,
    "explanation": "Tarifa wird oft als „Kitesurf-Hauptstadt Europas“ bezeichnet und liegt an der südlichsten Spitze Spaniens, wo das Mittelmeer auf den Atlantik trifft. Dieser einzigartige Ort bietet das ganze Jahr über konstante Winde, wobei die Sommermonate (Juni bis August) die Hauptsaison zum Kitesurfen sind. In der Gegend gibt es zahlreiche Kitesurfschulen und -verleihe, die sowohl Anfänger als auch erfahrene Kiter ansprechen."
}`;

export const EXAMPLE_3_INPUT_GERMAN = "Kitesurf-Urlaub mit meinen Freunden im Sommer";

export const EXAMPLE_3_OUTPUT_GERMAN = `{
    "destination": "Leucate, France",
    "origin": "Munich, Germany",
    "departure_date": "2023-07-01",
    "return_date": "2023-07-08",
    "count_adults": 4,
    "count_children": 0,
    "explanation": "Leucate liegt an der Mittelmeerküste Frankreichs und ist ein weiteres beliebtes Ziel für Kitesurfer in Europa. Das Gebiet ist für seine starken und zuverlässigen Winde bekannt und bietet verschiedene Kitesurf-Spots für alle Könnerstufen. Das jährliche Mondial du Vent-Event, das Ende April stattfindet, zieht Kitesurfer aus der ganzen Welt an und bietet eine großartige Gelegenheit, professionelle Wettbewerbe und Vorführungen mitzuerleben."
}`;
