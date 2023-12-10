import React, { Component } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { myAxios } from "../Services/Helper";
import { Cookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import { Button } from "bootstrap";

// set up cookies
const cookies = new Cookies();

class Members extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        name: "Member ID",
        selector: (row) => row.id,
      },
      {
        name: "Name",
        selector: (row) => row.name,
      },
      {
        name: "Gender",
        selector: (row) => row.gender,
      },
      {
        name: "Subscription Plan",
        selector: (row) => row.subscriptionPlan,
      },
      {
        name: "Subscription StartDate",
        selector: (row) => row.subscriptionStartDate,
      },
      {
        name: "Subscription EndDate",
        selector: (row) => row.subscriptionEndDate,
      },
      {
        name: "Member Status",
        selector: (row) => row.memberStatus,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div>
            <button
              className="btn btn-sm btn-primary"
              onClick={this.handleValueChange(row.id, "edit")}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger ml-2"
              style={{ marginLeft: "5px" }}
              onClick={this.handleValueChange(row.id, "delete")}
            >
              Delete
            </button>
          </div>
        ),
      },
    ];

    this.state = {
      membersData: [],
      memberDetail: {},
      records: [],
      memberUpdateFlag: false,
      memberId: "",
    };
  }

  handleFilter = (event) => {
    const newData = this.state.membersData.filter((row) => {
      return row.memberStatus
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    this.setState({
      records: newData,
    });
  };
  handleValueChange = (id, type) => (event) => {
    if (type == "delete") {
      myAxios
        .delete(`member/deleteMember/${id}`, {
          headers: { Authorization: `Bearer ${cookies.get("jwtToken")}` },
        })
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
          if (error.response.status == "403") {
            toast.error("Not Authorized To Delete !!", {
              position: "top-center",
            });
          }
        });
      return;
    }
    if (type == "edit") {
      this.setState(
        {
          memberUpdateFlag: true,
          memberId: { id },
        },
        () => console.log(this.state)
      );
      return;
    }
  };
  refreshData = () => {
    myAxios
      .get("/member/refreshMemberStatus", {
        headers: { Authorization: `Bearer ${cookies.get("jwtToken")}` },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(
          `Refrehing Failed. Please check log !! ${error.response.status}`,
          {
            position: "top-center",
          }
        );
      });
  };
  componentDidMount() {
    myAxios
      .get("/member/getMembers", {
        headers: { Authorization: `Bearer ${cookies.get("jwtToken")}` },
      })
      .then((response) => {
        this.setState({
          membersData: response.data,
          records: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="text-end">
          <input type="text" onChange={this.handleFilter} />
        </div>
        <DataTable
          title="All Members"
          fixedHeader
          columns={this.columns}
          data={this.state.records}
          pagination
          highlightOnHover
          fixedHeaderScrollHeight="300px"
        />
        <div className="d-flex justify-content-center align-items-center mt-2">
          <button className="btn btn-sm btn-primary" onClick={this.refreshData}>
            Refresh Data
          </button>
        </div>
        {this.state.memberUpdateFlag ? (
          <Navigate
            replace
            to="/modifyMember"
            state={{ memberId: this.state.memberId }}
          />
        ) : null}
        <ToastContainer />
      </div>
    );
  }
}

export default Members;
