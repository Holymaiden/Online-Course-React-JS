import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button,
  Grow,
  Container,
  Modal,
  Stack,
  TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { LoadingButton } from '@mui/lab';
import Snack from '../../../Components/SnackBar';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';

import { useState } from 'react';

import * as Yup from 'yup';
import {
  useFormik,
  Form,
  FormikProvider,
  useFormikContext,
  useField
} from 'formik';

import { updateUserProfile, updateUserEmail } from '../../../../../Api/Users';
import { useAuth } from '../../../../../contexts/auth.context';

function EditProfileTab({ user }) {
  const { setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const PersonalSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username is required'),
    birth: Yup.string().required('Birth is required'),
    address: Yup.string().required('Address is required')
  });

  const EmailSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required')
  });

  const formikPersonal = useFormik({
    initialValues: {
      username: user.username,
      birth: user.birth,
      address: user.address
    },
    validationSchema: PersonalSchema,
    onSubmit: function (data) {
      updateUserProfile(data).then(function (result) {
        if (result.code == 200) {
          Snack.success('Berhasil Di Update');
          setProfile(result);
        } else {
          Snack.error('Gagal Di Update');
        }
      });
    }
  });

  const formikEmail = useFormik({
    initialValues: {
      email: user.email
    },
    validationSchema: EmailSchema,
    onSubmit: function (data) {
      updateUserEmail(data).then(function (result) {
        if (result.code == 200) {
          Snack.success('Berhasil Di Update');
          setProfile(result);
        } else {
          Snack.error('Gagal Di Update');
        }
      });
    }
  });

  const setProfile = async (response) => {
    let data = { ...response };
    data = response.data;
    setUser(data);
    localStorage.setItem('user', data);
    window.location.reload();
  };

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } =
    formikPersonal;

  const classes = styles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card sx={{ background: '#4A47A3', color: '#ffffff' }}>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Personal Details
              </Typography>
              <Typography color="white" variant="subtitle2">
                Manage informations related to your personal details
              </Typography>
            </Box>
            <Button
              onClick={() => setOpen(true)}
              sx={{ color: '#FBD15B' }}
              startIcon={<EditTwoToneIcon />}
            >
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} color={'#ffffff'}>
                    Name:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text style={{ color: '#ffffff' }}>
                    <b>{user.username}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} color={'#ffffff'}>
                    Date of birth:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text style={{ color: '#ffffff' }}>
                    <b>{new Date(user.birth).toLocaleDateString()}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} color={'#ffffff'}>
                    Address:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text style={{ color: '#ffffff' }}>{user.address}</Text>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ background: '#4A47A3', color: '#ffffff' }}>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Account Settings
              </Typography>
              <Typography color="white" variant="subtitle2">
                Manage details related to your account
              </Typography>
            </Box>
            <Button sx={{ color: '#FBD15B' }} startIcon={<EditTwoToneIcon />}>
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} color={'#ffffff'}>
                    Language:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text style={{ color: '#ffffff' }}>
                    <b>English (US)</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} color={'#ffffff'}>
                    Timezone:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text style={{ color: '#ffffff' }}>
                    <b>GMT +2</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} color={'#ffffff'}>
                    Account status:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Label color={user.status == 1 ? 'success' : 'error'}>
                    <DoneTwoToneIcon fontSize="small" />
                    <b>{user.status == 1 ? 'Active' : 'Not Active'}</b>
                  </Label>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card sx={{ background: '#4A47A3', color: '#ffffff' }}>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Email Addresses
              </Typography>
              <Typography color="white" variant="subtitle2">
                Manage details related to your associated email addresses
              </Typography>
            </Box>
            <Button
              onClick={() => setOpen1(true)}
              sx={{ color: '#FBD15B' }}
              startIcon={<EditTwoToneIcon />}
            >
              Edit
            </Button>
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} color={'#ffffff'}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text style={{ color: '#ffffff' }}>
                    <b>{user.email}</b>
                  </Text>
                  <Box pl={1} component="span">
                    <Label color="success">Primary</Label>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2} color={'#ffffff'}>
                    Email ID:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text style={{ color: '#ffffff' }}>
                    <b>demo@example.com</b>
                  </Text>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
        fixed
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grow in={open}>
          <Container maxWidth="lg">
            <Box sx={style}>
              <FormikProvider value={formikPersonal}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Username"
                      sx={{
                        input: { color: 'white' }
                      }}
                      defaultValue={user.username}
                      className={classes.root}
                      {...getFieldProps('username')}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                    />

                    <DatePickerField name="birth" className={classes.root} />
                    <TextField
                      fullWidth
                      label="Address"
                      sx={{
                        input: { color: 'white' }
                      }}
                      className={classes.root}
                      defaultValue={user.address}
                      {...getFieldProps('address')}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                    >
                      Update
                    </LoadingButton>
                  </Stack>
                </Form>
              </FormikProvider>
            </Box>
          </Container>
        </Grow>
      </Modal>
      <Modal
        open={open1}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500
        }}
        fixed
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Grow in={open1}>
          <Container maxWidth="lg">
            <Box sx={style}>
              <FormikProvider value={formikEmail}>
                <Form
                  autoComplete="off"
                  noValidate
                  onSubmit={formikEmail.handleSubmit}
                >
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Email"
                      sx={{
                        input: { color: 'white' }
                      }}
                      defaultValue={user.email}
                      className={classes.root}
                      {...formikEmail.getFieldProps('email')}
                      error={Boolean(
                        formikEmail.touched.email && formikEmail.errors.email
                      )}
                      helperText={
                        formikEmail.touched.email && formikEmail.errors.email
                      }
                    />
                    <LoadingButton
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      loading={formikEmail.isSubmitting}
                    >
                      Update
                    </LoadingButton>
                  </Stack>
                </Form>
              </FormikProvider>
            </Box>
          </Container>
        </Grow>
      </Modal>
    </Grid>
  );
}

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <MobileDatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

const style = {
  bgcolor: 'background.paper',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  margin: 'auto',
  borderRadius: 3,
  p: 5
};

const styles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      }
    },
    '& .MuiFormLabel-root': {
      color: 'white'
    }
  }
});

export default EditProfileTab;
