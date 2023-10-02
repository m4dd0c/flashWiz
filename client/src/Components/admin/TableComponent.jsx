import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Table, Row, TableWrapper, Cell } from "react-native-table-component";
import { Btns } from "./Btns";
import { styles } from "../../theme/style";
import { formatMe } from "../../api/api";

export const TableComponent = ({ users }) => {
  //table head cell width
  const widthArr = [200, 200, 200, 200, 200, 200];
  //table head titles
  const tableHead = ["serial_num", "u_id", "Name", "Email", "Role", "Action"];
  //state
  const [tableData, setTableData] = useState([]);

  //forming table data consisting rows of cells
  useEffect(() => {
    if (users) {
      let incomingData = [];
      for (let i = 0; i < users.length; i++) {
        //row
        const row = [
          formatMe(i + 1), //cell
          users[i]._id, //cell
          users[i].name, //cell
          users[i].email, //cell
          users[i].role, //cell
          users[i]._id, //cell
        ];
        incomingData.push(row);
      }
      setTableData(incomingData);
    }
  }, [users]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row
              data={tableHead}
              style={styles.head}
              widthArr={widthArr}
              textStyle={styles.headText}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              {tableData.map((rowData, index) => (
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={
                        cellIndex === tableData[0].length - 1 ? (
                          <Btns id={cellData} />
                        ) : (
                          cellData
                        )
                      }
                      textStyle={{
                        margin: 10,
                        textAlign: "center",
                        fontFamily: "montReg",
                      }}
                      width={200}
                    />
                  ))}
                </TableWrapper>
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
