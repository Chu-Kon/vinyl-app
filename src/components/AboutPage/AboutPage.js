import React from 'react';
import { Title, Mark, Text } from '@mantine/core';

export default function AboutPage() {
  return (
    <div>
        <Title order={1}>About the App</Title>
        <Text>The application for creating your own vinyl collection.</Text>
        <Text>You can search for the desired music albums in our database, add them to your wishlist or to your collection.</Text>
        <Title order={2}>How to use the App?</Title>
        <Text>Go to the search page and find the album you are interested in.</Text>
        <Text>Click on <Mark color="violet"><b>+</b> <i>(plus button)</i></Mark> to add an album to collection if you already have such a record.</Text>
        <Text>Click on <Mark color="violet"><b>&#x2661;</b> <i>(heart-shaped button)</i></Mark> to add vinyl to wishlist.</Text>
        <Text>You can also listen to the album on Spotify for reference.</Text>
        <Text>When you click on the album cover, a window with detailed information about the album will open.</Text>

        {/* <Text>
          Go to the search page and find the album you are interested in.
          On the album card, click on <Mark><b>+</b> <i>(plus button)</i></Mark> to add an album to collection if you already have such a record.
          Click on <b>&#x2661;</b> <i>(heart-shaped button)</i> to add vinyl to wishlist
          You can also listen to the album on Spotify for reference.
          When you click on the album cover, a window with detailed information about the album will open.
        </Text> */}
    </div>
  )
}
