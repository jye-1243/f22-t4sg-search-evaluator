import {Table, Button} from 'flowbite-react';
import React from 'react';
import {useState} from 'react';
import db from "./firebase";

const QueryBlock = (props) => {


const rele = [
  {i:0, r: -1},
  {i:1, r:-1},
  {i:2, r:-1},
  {i:3, r:-1},
  {i:4, r:-1}];
  // rele is the initial state variable for the five results (indexed with i) and relevance (0, 1, 2, 3. -1 placeholder)


const [data, setData] = useState(rele);
//data is the state variable for relevance
const [submitted, setSubmitted] = useState(false);


const len = props.results.length;


const makeArr = () => {
  let content = [];
  for (let i = 0; i < props.results.length; i++) {
    const url = props.results[i].return_url;
    const description = props.results[i].description;
    const text = props.results[i].text;
    const total = [i, text, url, description]
    content.push(total);
  }
  return content;
};

const loaded = makeArr();
//array format: [i][j]
// i: 0, 1, 2, 3, 4. index of results
// j: 0 is i duplicate, 1 is text, 2 is url, 3 is description

const handClick = (idx, rel) => {

  const newState = data.map(obj => {
    if (obj.i === idx) {
      return {...obj, r: rel};
    }
    return obj;
  });
  console.log(newState);
  setData(newState);
};

const handSubmit = () => {
  const tmp = [];
  data.map(d =>{
    tmp.push(d.r)
  })

  db.collection("responses").add({
    user_id: props.email,
    query_id: props.query_id,
    rankings: tmp
  });

  setSubmitted(true);
};

  return (
    <div >
      <p className="text-3xl text-gray-700 font-bold mb-5">
        {props.query}
      </p>

      <Table>
        <Table.Head>
          <Table.HeadCell>
            Result
          </Table.HeadCell>
          <Table.HeadCell>
            <span>
              Rating
            </span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {loaded.map(s => {
              return (
              <Table.Row key={s} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <p className="text-l text-gray-700 font-bold mb-5">{s[1]} </p>
                  <p>
                  {s[3].length > 80 ? s[3].substring(0, 80)+"..." : s[3]} 
                  </p>            
                  <a href={s[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'blue' }}>{s[2].length > 40 ? s[2].substring(0, 40) +"..." : s[2]} </a>
                </Table.Cell>

                <Table.Cell>
                  <Button.Group >
                    <Button color={data[s[0]].r == 0 ? "info" : "gray"} onClick={() => {
                      handClick(s[0], 0);
                    }}>
                      Irrelevant
                    </Button>
                    <Button color={data[s[0]].r == 1 ? "info" : "gray"} onClick={() => {
                      handClick(s[0], 1);
                    }}>
                      Partially relevant
                    </Button>
                    <Button color={data[s[0]].r == 2 ? "info" : "gray"} onClick={() => {
                      handClick(s[0], 2);
                    }}>
                      Relevant
                    </Button>
                    <Button color={data[s[0]].r == 3 ? "info" : "gray"} onClick={() => {
                            handClick(s[0], 3);
                    }}>
                      Perfect
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>           
            );
          })}
    </Table.Body>
    </Table>

    <div className="w-3/12">
      <br></br>
        <Button disabled={submitted} onClick={handSubmit}>
          Submit
        </Button>
        </div>

        <p>
  
      </p>
    <br>
    </br>
    </div>
  );
}
export default QueryBlock;