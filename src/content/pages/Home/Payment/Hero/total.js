import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import CloseIcon from '@mui/icons-material/Close';

import { findDiscountByUser } from '../../../../../Api/Discount';

import {
  varFadeInRight,
  MotionInView
} from '../../../../../components/animate';

function Total({ course, discount }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [dis, setDis] = useState(0);
  const [kode, setKode] = useState(0);

  useEffect(() => {
    discount(kode);
  }, [kode]);

  const handleClick = () => {
    findDiscountByUser(dis).then(function (result) {
      if (result.code == 200) {
        setKode(result.data);
        enqueueSnackbar('Diskon Terpasang', {
          variant: 'success',
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          )
        });
      } else if (result.code == 300) {
        setKode({ persentase: 0 });
        enqueueSnackbar('Diskon Tidak Ditemukan', {
          variant: 'error',
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          )
        });
      } else {
        setKode({ persentase: 0 });
        enqueueSnackbar('Diskon Sudah Terpakai', {
          variant: 'warning',
          action: (key) => (
            <IconButton size="small" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          )
        });
      }
    });
  };

  const classes = styles();

  return (
    <Grid item sm={12} md={6} xs={12}>
      <Card
        sx={{
          background: '#634acc',
          height: '100%',
          width: '100%',
          borderRadius: 3
        }}
      >
        <MotionInView variants={varFadeInRight}>
          <Box sx={{ m: 3 }}>
            <Card
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: '#8254e3'
              }}
            >
              <Stack direction="row" spacing={2}>
                <Avatar
                  sx={{ m: 2 }}
                  variant="rounded"
                  alt={course.title}
                  src={course.image}
                ></Avatar>
                <Box>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      color: 'white',
                      background: '#FBD15B',
                      opacity: '95%',
                      mb: 1
                    }}
                  >
                    {course.category}
                  </Button>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: 13,
                        color: 'white'
                      }
                    }}
                  >
                    {course.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        lg: 13,
                        color: 'white'
                      }
                    }}
                  >
                    {course.status == '1' ? 'Active' : 'Process '}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Box>
          <Grid container sx={{ mx: 0 }} spacing={3}>
            <Grid item xs={8}>
              <TextField
                sx={{ width: '100%' }}
                color="warning"
                label="Discount Code"
                variant="outlined"
                className={classes.root}
                onChange={(x) => setDis(x.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                sx={{
                  width: '100%',
                  height: '100%',
                  color: 'white',
                  background: '#FBD15B',
                  opacity: '95%',
                  borderRadius: 2
                }}
                variant="outlined"
                onClick={handleClick}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
          <Box sx={{ my: 3, mx: 6 }}>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography>Materi Price</Typography>
              <Typography color="white">
                Rp. {parseInt(course.price).toLocaleString()}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography>Discount</Typography>
              <Typography color="greenyellow">
                - Rp.{' '}
                {kode.persentase
                  ? (course.price * (kode.persentase / 100)).toLocaleString()
                  : 0}
              </Typography>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Typography variant="h4" color="white">
                Total Amount
              </Typography>
              <Typography variant="h4" color="white">
                Rp.{' '}
                {kode.persentase
                  ? (
                      course.price -
                      course.price * (kode.persentase / 100)
                    ).toLocaleString()
                  : parseInt(course.price).toLocaleString()}
              </Typography>
            </Stack>
          </Box>
        </MotionInView>
      </Card>
    </Grid>
  );
}

const styles = makeStyles({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
        borderRadius: 12
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

export default Total;
