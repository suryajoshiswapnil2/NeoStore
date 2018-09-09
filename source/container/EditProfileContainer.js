import EditProfile from "../components/screens/editprofile/editprofile";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(EditProfile);
