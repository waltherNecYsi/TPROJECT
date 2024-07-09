import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// _mock_
import { _bookings, _bookingNew, _bookingsOverview, _bookingReview } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  BookingDetails,
  BookingNewestBooking,
} from '../../sections/@dashboard/Main/booking';
// assets
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
} from '../../assets/illustrations';

// ----------------------------------------------------------------------

export default function GeneralBookingPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> General: Reservas</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <BookingNewestBooking
              title="Nuestros Servicios"
              subheader="servicios"
              list={_bookingNew}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <BookingDetails
              title="Ultimas Citas"
              tableData={_bookings}
              tableLabels={[
                { id: 'booker', label: 'Booker' },
                { id: 'checkIn', label: 'Check In' },
                { id: 'checkOut', label: 'Check Out' },
                { id: 'status', label: 'Status' },
                { id: 'phone', label: 'Phone' },
                { id: 'roomType', label: 'Room Type' },
                { id: '' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
