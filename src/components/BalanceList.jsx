// // src/components/BalanceList.js
// import React from 'react';

// const BalanceList = ({ balances }) => (
//   // <ul>
//   //   {Object.keys(balances).map(person => (
//   //     <li key={person}>{person}: pkr {balances[person].toFixed(2)}</li>
//   //   ))}
//   // </ul>
//   <table>
//   <thead>
//     <tr>
//       <th>Person</th>
//       <th>Balance (PKR)</th>
//     </tr>
//   </thead>
//   <tbody>
//     {Object.keys(balances).map(person => (
//       <tr key={person}>
//         <td>{person}</td>
//         <td>{balances[person].toFixed(2)}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>
// );

// export default BalanceList;
// src/components/BalanceList.js
import React from 'react';
import Table from 'react-bootstrap/Table';

const BalanceList = ({ balances }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Person</th>
        <th>Balance (PKR)</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(balances).map(person => (
        <tr key={person}>
          <td>{person}</td>
          <td>{balances[person].toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default BalanceList;
