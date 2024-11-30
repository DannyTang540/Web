import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';
import BreadcrumbComponent from '../Breadcrumbs/BreadcrumbComponent';
import TestFieldSmall from '../Input/TestFieldSmall';
import SelectInput from '../Input/SelectInput';
import TestFiedComponent from '../Input/TestFiedComponent';
import TestArial from '../Input/TestArial';
import AutocompletedComponent from '../Input/AutocompletedComponent';
import CheckBoxComponent from '../Input/CheckBoxComponent';

interface CreateProductDialogProps {
  open: boolean;
  handleClose: () => void;
  productName: string;
  setProductName: (value: string) => void;
}

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  open,
  handleClose,
  productName,
  setProductName,
}) => {
  const style = {}; // Define your styles here

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
      <DialogTitle>
        <h3>Create Product</h3>
        <p>
          <BreadcrumbComponent
            label={[
              { label: 'Dashboard', final: false },
              { label: 'Product', final: false },
              { label: 'Create', final: true },
            ]}
          />
        </p>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <List sx={style}>
            <ListItem>
              <ListItemText
                primary={
                  <div>
                    <h4>Details</h4>
                    <p>Title, short description, image...</p>
                  </div>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <TestFieldSmall
                        placeholder="Enter product name"
                        value={productName}
                        setvalue={setProductName}
                        title="Product Name"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectInput title="Category" />
                    </Grid>
                    <Grid item xs={4}>
                      <SelectInput title="Material" />
                    </Grid>
                  </Grid>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <TestFiedComponent
                    placeholder="Enter your product title"
                    title="Title Product"
                    value={productName}
                    setvalue={setProductName}
                  />
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <TestArial
                    title="Description"
                    value={productName}
                    setvalue={setProductName}
                  />
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      title="Product Image"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            // setProductImage(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <AutocompletedComponent
                        title="Color"
                        placeholder="Choose Color"
                        array={[
                          { key: 'Đỏ', value: '#1111' },
                          { key: 'Xanh', value: '#1111' },
                          { key: 'Vàng', value: '#1111' },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <AutocompletedComponent
                        title="Size"
                        placeholder="Choose Size"
                        array={[
                          { key: 'Small', value: 'S' },
                          { key: 'Medium', value: 'M' },
                          { key: 'Big', value: 'XL' },
                        ]}
                      />
                    </Grid>
                  </Grid>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <Grid container spacing={1}>
                    <Grid item xs={8}>
                      <h4>Gender</h4>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <CheckBoxComponent
                          value={productName}
                          setvalue={setProductName}
                          title="Male"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CheckBoxComponent
                          value={productName}
                          setvalue={setProductName}
                          title="Female"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <CheckBoxComponent
                          value={productName}
                          setvalue={setProductName}
                          title="Unisex"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <div>
                    <h4>Prices</h4>
                    <p>Price related inputs</p>
                  </div>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <TestFiedComponent
                    placeholder="$ 0.00Đ"
                    title="Origin Price"
                    value={productName}
                    setvalue={setProductName}
                  />
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary={
                  <TestFiedComponent
                    placeholder="$ 0.00Đ"
                    title="Selling Price"
                    value={productName}
                    setvalue={setProductName}
                  />
                }
              />
            </ListItem>
            <Divider component="li" />
          </List>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="info" variant="outlined" onClick={handleClose}>
          Create
        </Button>
        <Button variant="text" color="error" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductDialog;
