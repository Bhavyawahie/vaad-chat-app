import React from 'react';
import { Container, Skeleton, Stack } from '@chakra-ui/react';

const Userloading = () => {
    return (
        <Container my={5}>
            <Stack>
                {[...Array(40).keys()].map(() => <Skeleton height="40px"/>)}
            </Stack>
        </Container>
    )
}

export default Userloading
