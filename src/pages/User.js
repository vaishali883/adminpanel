import { useSelector } from "react-redux";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import editFill from "@iconify/icons-eva/edit-fill";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import SearchNotFound from "../components/SearchNotFound";
import SnackbarModule from "./sanckbar";
import { getAlluserData } from "../action/userActions";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../components/_dashboard/user";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import axios from "axios";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "user_name", label: "Name", alignRight: false },
  { id: "emailid", label: "Email ID", alignRight: false },
  { id: "birthday", label: "BirthDay", alignRight: false },
  { id: "phhno", label: "Phone No", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "action", label: "Action", alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.user_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState({});
  const [orderBy, setOrderBy] = useState("user_name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSnackbarClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getAlluserData());
    // await dispatch(getAllArtistData());
  },[]);

  

  const [singleUserModal, setSingleUserModal] = useState(false);
  const newUserAddtoggle = () => setSingleUserModal(!singleUserModal);

  const userdata = useSelector((state) => state.user.userData);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userdata.map((n) => n.user_name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:4000/user/${id}`)
      .then((res) => {
        setOpen(true);
        setMsg("User Deleted Successfully!");
        setSeverity("success");
      })
      .catch(() => {
        setOpen(true);
        setMsg("Oops!! Something went wrong!!");
        setSeverity("error");
      });
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userdata.length) : 0;

  const filteredUsers = applySortFilter(
    userdata,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <div>
      <SnackbarModule
        open={open}
        message={msg}
        handleSnackbarClose={handleSnackbarClose}
        severity={severity}
      />

      <Page title="User | Music-UI">
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4" gutterBottom>
              User
            </Typography>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={plusFill} />}
              onClick={() => setModal(true)}
            >
              New User
            </Button>
          </Stack>

          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={userdata.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          _id,
                          user_name,
                          Email,
                          birthday,
                          phhno,
                          gender,
                          avatarUrl
                        } = row;
                        const isItemSelected = selected.indexOf(user_name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, user_name)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={user_name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {user_name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            {/* <TableCell align="left">{company}</TableCell> */}
                            <TableCell align="left">{Email}</TableCell>
                            <TableCell align="left">
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Typography variant="subtitle2" noWrap>
                                  {birthday}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Typography variant="subtitle2" noWrap>
                                  {phhno}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Typography variant="subtitle2" noWrap>
                                  {gender}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell
                              align="left"
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Icon
                                icon={editFill}
                                width={25}
                                height={28}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setData(row);
                                  setEditModal(true);
                                }}
                              />
                              <Icon
                                style={{
                                  marginRight: "25%",
                                  cursor: "pointer",
                                }}
                                onClick={() => deleteUser(row._id)}
                                icon={trash2Outline}
                                width={24}
                                height={24}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterName} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userdata.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
      <EditUser
        modalOpen={editmodal}
        data={data}
        toggleModal={() => setEditModal(!editmodal)}
      />
      <AddUser toggleModal={() => setModal(!modal)} modalOpen={modal} />
    </div>
  );
}
