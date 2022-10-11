import {Label, Dropdown, Table, TextInput, Checkbox, Button, Rating} from 'flowbite-react';
import React from 'react';
import {useState} from 'react';

const QueryBlock = () => {

const results = [
  {i: 0, name: 'Search result 1', description: 'This is a description', relevance: 0}, 
  {i: 1, name: 'Search result 2', description: 'Currently describing Search Result 2. Accompanying text', relevance: 0},
  {i: 2, name: 'Search result 3', description: 'yea..h', relevance: 0},
  {i: 3, name: 'Four', description: 'Yeah yeah yeah', relevance: 0},
  {i: 4, name: 'Fifth search result', description: "Lorem Ipsum is simply dummy text. Search result", relevance: 0}
];

const rele = [
  {i:0, r: 0},
  {i:1, r:0},
  {i:2, r:0},
  {i:3, r:0},
  {i:4, r:0}];



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

    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
    <p className="text-3xl text-gray-700 font-bold mb-5">
            QUERY
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
            <p>{s.description}</p>
            </Table.Cell>
            <Table.Cell>
            
            <Button.Group outline={true}>
        <Button color="gray" onClick={() => {
                console.log(s.i+"si");
                handClick(s.i, 0);
                        }}>
        Irrelevant
        </Button>
        <Button color="gray" onClick={() => {
                console.log(s.i+"si");
                handClick(s.i, 1);
                        }}>
        Partially relevant
        </Button>
        <Button color="gray" onClick={() => {
                console.log(s.i+"si");
                handClick(s.i, 2);
                        }}>
        Relevant
        </Button>
        <Button color="gray" onClick={() => {
                console.log(s.i+"si");
                handClick(s.i, 5);
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


    </div>

  );
}
export default QueryBlock;