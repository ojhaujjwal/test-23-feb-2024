type Style = 'underline' | 'bold';

type RawNode = {
  id: string;
  text: string;
  style?: Style;
};

type Range = {
  start: number;
  end: number;
};

type Styling = {
  style: Style;
  range?: Range;
};

type Node = {
  id: string;
  text: string;
  styling?: ReadonlyArray<Styling>;
};

const generateId = () => String(Math.random());


export const transformRawNodes = (rawNodes: ReadonlyArray<RawNode>): Array<Node> => {
  let styleFoundAt: number | null = null;
  let styleFound: Style | null = null;
  let foundMode = false;

  let outputNodes: Array<Node> = [];
  
  rawNodes.forEach((rawNode, i) => {
    if (rawNode.style) {
      if (!foundMode) {
        styleFoundAt = i;
        styleFound = rawNode.style;
        //console.log(1, foundMode, i);
        foundMode = true;
      }
    } else {
      if (foundMode) {
        console.log(2, foundMode, i); 
        
        //delete outputNodes[outputNodes.length - 1];

        const endofRangeIndex = i - 1;

        console.log(styleFoundAt, endofRangeIndex);

        //range text generation isn't working
        const rangeText = rawNodes.slice(styleFoundAt as number, endofRangeIndex).reduce(((finalText, { text }) => finalText + text), '');

        outputNodes.push({id: generateId(), text: rangeText, styling: [
          {
            style: styleFound as Style,
            range: {
              start: styleFoundAt as number,
              end: endofRangeIndex,
            }
          }
        ], })

        foundMode = false;
        styleFoundAt = null;
        styleFound = null;

      }
      outputNodes.push(rawNode)
    }
  });

  return outputNodes;
};


console.log(
  JSON.stringify(transformRawNodes([
    {"id": "1", "text": "I accept the "},
    {"id": "2", "text": "terms and", "style": "underline"},
    {"id": "3", "text": "conditions", "style": "underline"},
    {"id": "4", "text": "."},
    {"id": "4", "text": "Please Continue"}
  ]))
);
