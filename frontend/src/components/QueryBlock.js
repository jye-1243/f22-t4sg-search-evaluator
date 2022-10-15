import {Label, Dropdown, Table, TextInput, Checkbox, Button, Rating} from 'flowbite-react';
import React from 'react';
import {useState} from 'react';

const QueryBlock = (props) => {

const results = [
  {i: 0, name: 'Search result 1', description: 'This is a description', url: 'https://cambridgema.gov'}, 
  {i: 1, name: 'Search result 2', description: 'Currently describing Search Result 2. Drag and drop your tournament.py and answers.txt files to the area that says “Drag & Drop”. Be sure it has those exact filenames! If you upload a file with a different name, the autograder likeAccompanying text', url: 'https://cambridgema.gov'},
  {i: 2, name: 'Search result 3', description: 'yea..h', url: 'https://cambridgema.gov'},
  {i: 3, name: 'Four', description: 'Yeah yeah yeah', url: 'https://cambridgema.gov' },
  {i: 4, name: 'Fifth search result', description: "Lorem Ipsum is simply dummy text. Search result", url: 'https://cambridgema.gov'}
];

const rele = [
  {i:0, r: -1},
  {i:1, r:-1},
  {i:2, r:-1},
  {i:3, r:-1},
  {i:4, r:-1}];


const [data, setData] = useState(rele);

const handClick = (idx, rel) => {
  const newState = data.map(obj => {
    if (obj.i === idx) {
      return {...obj, r: rel};
    }
    return obj;
  });
  setData(newState);
};

  return (

    <div >
    <p className="text-3xl text-gray-700 font-bold mb-5">
            {props.query}
        </p>



    <Table>
    <Table.Head>
    <Table.HeadCell>
        Query
    </Table.HeadCell>
    <Table.HeadCell>
        <span>
        Rating
        </span>
    </Table.HeadCell>
    </Table.Head>

    <Table.Body className="divide-y">


    {results.map(s => {
        return (

        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            <p className="text-xl text-gray-700 font-bold mb-5">{s.name}</p>
            
            <p>
            {s.description.length > 100 ? s.description.substring(0, 100)+"..." : s.description} 
              </p>


            
            <a href={s.url} style={{ color: 'blue' }}>{s.url}</a>
            </Table.Cell>
            <Table.Cell>
            
            <Button.Group >
          <Button color={data[s.i].r == 0 ? "info" : "gray"} onClick={() => {
                handClick(s.i, 0);
                
                        }}>
        Irrelevant
        </Button>
        <Button color={data[s.i].r == 1 ? "info" : "gray"} onClick={() => {
                handClick(s.i, 1);
                        }}>
        Partially relevant
        </Button>
        <Button color={data[s.i].r == 2 ? "info" : "gray"} onClick={() => {
                handClick(s.i, 2);
                        }}>
        Relevant
        </Button>
        <Button color={data[s.i].r == 3 ? "info" : "gray"} onClick={() => {
                handClick(s.i, 3);
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

<p>
  
</p>
<br>
</br>



    </div>

  );
}
export default QueryBlock;