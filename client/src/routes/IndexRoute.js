import Card from '../components/Card';
import bank from './bank.png';

export default function indexRoute() {
  return (
    <>
      <Card
        color='success'
        header='BadBank Landing Module'
        title='Please Log In To Use Our Awesome Bank'
        text='You can move around using the navigation bar.'
        body={<img src={bank} className='img-fluid' alt='bank' />}
      />
    </>
  );
}
