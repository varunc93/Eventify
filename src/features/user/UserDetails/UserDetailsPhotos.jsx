import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

const UserDetailsPhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="image" content="Photos" />

        <Image.Group size="small">
          {photos &&
            photos.map(photo => (
              <LazyLoad
                key={photo.id}
                height={150}
                placeholder={<Image src="/assets/images/user.png" />}
              >
                <Image src={photo.url} />
              </LazyLoad>
            ))}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailsPhotos;
