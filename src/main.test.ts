import { transformRawNodes } from "main.ts";

describe('transformRawNodes', () => {
  it ('should detecting range style from the raw styles', () => {
    const result = transformRawNodes([
      {"id": "1", "text": "I accept the "},
      {"id": "2", "text": "terms and", "style": "underline"},
      {"id": "3", "text": "conditions", "style": "underline"},
      {"id": "4", "text": "."},
      {"id": "4", "text": "Please Continue"}
    ]);

    expect(result).toEqual(
      [
        {
          "id": "a",
          "text": "I accept the terms and conditions.Please Continue.",
          "styling": [
            {"style": "underline", "range": {start: 14, end: 13}}
          ]
        }
      ]
    );
  });
});
