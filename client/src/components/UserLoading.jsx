import React, { useEffect, useState } from 'react';
import { Container, Skeleton, Stack } from '@chakra-ui/react';

const Userloading = () => {
    const [skeletonEl, setSkeletonEl] = useState([])
    useEffect(() => {
        setSkeletonEl([...Array(Math.floor(document.body.scrollHeight/40)).keys()])
    }, [])
    return (
        <Container my={5}>
            <Stack>
                {skeletonEl.map(() => <Skeleton height="40px"/>)}
            </Stack>
        </Container>
    )
}

export default Userloading
