import React, { useState } from "react";

interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  paymentId: [string];
  balance: number;
  transactions: [Object];
}

interface Props {
  userData: User;
}
const TransactionHistory = React.forwardRef<HTMLDivElement, Props>(
  (props, ref) => (
    <div ref={ref}>
      <h2 className="text-4xl text-black font-semibold">Transaction History</h2>
      <div className="rounded-2xl py-10 shadow-bigCard border px-7 border-fourteenth">
        <div className="mb-14 w-full">
          <div className="w-full">
            <table className="w-full">
              <tbody>
                <tr className="grid grid-cols-5 w-full border-b border-fifth border-opacity-30">
                  <th className="text-lg font-semibold text-fifth text-opacity-70">
                    Date
                  </th>
                  <th className="text-lg font-semibold text-fifth text-opacity-70">
                    Credit
                  </th>
                  <th className="text-lg font-semibold text-fifth text-opacity-70">
                    Debit
                  </th>
                  <th className="text-lg font-semibold text-fifth text-opacity-70">
                    Balance
                  </th>
                  <th className="text-lg font-semibold text-fifth text-opacity-70">
                    Remarks
                  </th>
                </tr>
              </tbody>
              {props.userData.transactions.map((field: any, index: number) => {
                return (
                  <tbody key={index}>
                    <tr className="grid grid-cols-5 w-full border-b border-fifth border-opacity-30">
                      <td className="py-7 text-sm font-medium text-fifth">
                        {field.createdAt}
                      </td>
                      <td className="py-7 text-sm font-medium text-fifth">
                        {field.credit}
                      </td>
                      <td className="py-7 text-sm font-medium text-fifth">
                        {field.debit}
                      </td>
                      <td className="py-7 text-sm font-medium text-fifth">
                        {field.balance}
                      </td>
                      <td className="py-7 text-sm font-medium text-fifth">
                        {field.remarks}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
);

export default TransactionHistory;
