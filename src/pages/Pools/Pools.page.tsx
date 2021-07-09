import React, { useState, useEffect } from "react";
import { useGUniFactoryContract } from "hooks/useContract";
import PoolInfo from "../../components/PoolInfo";
import Loader from "../../components/Loader";
import { 
  Box, 
  Title, 
  List, 
  StyledLoader 
} from "./Pools.styled";

interface PoolParam {
  address: string;
}

export default function ListPools() {
  const guniFactory = useGUniFactoryContract();
  const [pools, setPools] = useState<PoolParam[]>([]);
  const [loading, setLoading] = useState<boolean> (false);

  useEffect(() => {
    setLoading(true);
    const fetchPools = async () => {
      if (guniFactory) {
        const res = await guniFactory.getGelatoPools();
        setPools(res.map((address: string) => ({ address })));
        setLoading(false);
      }
    };
    fetchPools();
  }, [guniFactory, setLoading]);

  return (
    <Box>
      <Title>G-UNI Pools</Title>
      {loading ? (
        <StyledLoader>
          <Loader />
        </StyledLoader>
      ) : (
        <List>
          {pools.map((pool:PoolParam, index) => (
            <PoolInfo key={index} address={pool.address} />
          ))}
        </List>
      )}
    </Box>
  );
}