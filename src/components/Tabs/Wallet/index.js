import React from "react";
import pusher from "../../../libs/pusher";
import SideDrawer from "../../shared/SideDrawer";
import AmountMenu from "./amount_menu";
import TransactionMenu from "./transaction_menu";
import Transactions from "./transactions";

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "success"
    };
  }

  async componentWillMount() {
    const { auth } = this.props;
    const { authUser } = auth;

    const socket = await pusher();
    const channel = socket.subscribe(`order-status-updated.${authUser.id}`);

    channel.bind("App\\Events\\UpdateOrderStatus", data => {
      // update wallet
      console.log(data);
    });
  }

  filterTransactions = status => {
    this.setState(status);
  };

  render() {
    const { filter } = this.state;

    return (
      <SideDrawer {...this.props}>
        <AmountMenu {...this.props} />
        <TransactionMenu
          {...this.props}
          filterTransactions={this.filterTransactions}
        />
        <Transactions {...this.props} filter={filter} />
      </SideDrawer>
    );
  }
}

export default Wallet;
