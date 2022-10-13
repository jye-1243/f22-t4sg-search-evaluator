import {Label, Dropdown, Table, TextInput, Checkbox, Button, Rating} from 'flowbite-react';
import React from 'react';
import {useState} from 'react';

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
  });;
  //console.log(idx + " " + rel);
  setData(newState);
};

export default function RateForm(props) {
    return (
<div>
<p className="text-3xl text-gray-700 font-bold mb-5">
        {props.query}
      </p>
      <Table>
<Table.Head>
  <Table.HeadCell>
  {props.query}
  </Table.HeadCell>
  <Table.HeadCell>
    <span>
    {props.query}
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
            console.log(s.i+"ssssi");
            handClick(s.i, 0);
            console.log(data[i].r + " final ");
                      }}>
      Irrelevant
    </Button>
    <Button color="gray" onClick={() => {
            console.log(s.i+"si");
            handClick(s.i, 1);
            console.log(data[i].r + " final ");
                      }}>
      Partially relevant
    </Button>
    <Button color="gray" onClick={() => {
            console.log(s.i+"si");
            handClick(s.i, 2);
            console.log(data[i].r + " final ");
                      }}>
      Relevant
    </Button>
    <Button color="gray" onClick={() => {
            console.log(s.i+"si");
            handClick(s.i, 5);
            console.log(data[i].r + " final ");
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