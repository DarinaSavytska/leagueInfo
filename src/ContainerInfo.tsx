import React, { useState } from 'react';
import { getPokemonByNumber } from './api';

export const ContainerInfo: React.FC = () => {
  const [pokeNumberForSearch, setPokeNumberForSearch] = useState<number>(1);
  const [pokemon, setPokemon] = useState<any>(null);

  const [pokeName, setPokeName] = useState<string>();
  const [pokeNum, setPokeNum] = useState<number>();

  const [tempGenecodeOfPokemon, setTempGenecodeOfPokemon] = useState<string>();
  const [genecodeOfPokemon, setGenecodeOfPokemon] = useState<string>();

  const getPokemon = async (number: number) => {
    const pokemonFromAPI = await getPokemonByNumber(number);

    setPokeName(pokemonFromAPI.forms[0].name);
    setPokeNum(pokemonFromAPI.id);
    setPokemon(pokemonFromAPI);

    console.log(pokemonFromAPI);
  };

  const onCountGenecode = (e: any) => {
    setTempGenecodeOfPokemon(e.target.value);
  };

  // const onChangeHP = (e: any) => {
  //   setHpState(e.target.value);
  // };

  // const onChangeAttack = (e: any) => {
  //   setAttackState(e.target.value);
  // };

  const onChangePokeNumber = (e: any) => {
    setPokeNumberForSearch(e.target.value);
  };

  const [evHP, setEvHP] = useState<number>(0);
  const [evA, setEvA] = useState<number>(0);
  const [evD, setEvD] = useState<number>(0);
  const [evS, setEvS] = useState<number>(0);
  const [evSa, setEvSa] = useState<number>(0);
  const [evSd, setEvSd] = useState<number>(0);

  const onEvChange = (gen: string, e: any) => {
    const ev = () => {
      if (e.target.value > 126) {
        return 126;
      } else if (e.target.value === 0) {
        return null;
      } else {
        return e.target.value;
      }
    };

    gen === 'hp' && setEvHP(ev());
    gen === 'a' && setEvA(ev());
    gen === 'd' && setEvD(ev());
    gen === 's' && setEvS(ev());
    gen === 'sa' && setEvSa(ev());
    gen === 'sd' && setEvSd(ev());
  };

  return (
    <div>
      <p>Test info. Don't work with Neophytes</p>

      <div style={{ display: 'flex', height: '150px' }}>
        <div>
          <p>Select number of pokemon</p>
          <div
            style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}
          >
            <input
              name='pokeNumber'
              type='number'
              value={pokeNumberForSearch}
              onChange={onChangePokeNumber}
              min={0}
              max={1008}
              step={1}
            />
            <button
              onClick={() => getPokemon(pokeNumberForSearch)}
              type='submit'
            >
              Load pokemon
            </button>
          </div>
        </div>

        <div style={{ marginLeft: '30px' }}>
          <p>
            {pokeName ? `Pokemon #${pokeNum} is ${pokeName}` : 'Choose pokemon'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {pokemon && (
              <div
                style={{
                  display: 'flex',
                  marginLeft: '10px',
                  alignItems: 'center',
                }}
              >
                <p>{pokemon?.sprites?.front_female ? '???' : '???/???'}</p>
                <img alt='Pokemon sprite' src={pokemon.sprites.front_default} />
              </div>
            )}
            {pokemon?.sprites?.front_female && (
              <div
                style={{
                  display: 'flex',
                  marginLeft: '10px',
                  alignItems: 'center',
                }}
              >
                <p>???</p>
                <img alt='Pokemon sprite' src={pokemon.sprites.front_female} />
              </div>
            )}
          </div>
        </div>
      </div>

      {pokemon && (
        <>
          <div style={{ display: 'flex', gap: '100px' }}>
            <div>
              <p>Stats</p>
              <p>hp - {pokemon.stats[0].base_stat}</p>
              <p>a - {pokemon.stats[1].base_stat}</p>
              <p>d - {pokemon.stats[2].base_stat}</p>
              <p>s - {pokemon.stats[5].base_stat}</p>
              <p>sa - {pokemon.stats[3].base_stat}</p>
              <p>sd - {pokemon.stats[4].base_stat}</p>
            </div>

            <div>
              <p>Genecode</p>
              <p>
                {`hp - ${
                  Number(genecodeOfPokemon?.split('h')[1].split('a')[0]) || 0
                }`}
              </p>
              <p>{`a - ${
                Number(genecodeOfPokemon?.split('a')[1].split('d')[0]) || 0
              }`}</p>
              <p>{`d - ${
                Number(genecodeOfPokemon?.split('d')[1].split('s')[0]) || 0
              }`}</p>
              <p>{`s - ${
                Number(genecodeOfPokemon?.split('s')[1].split('sa')[0]) || 0
              }`}</p>
              <p>{`sa - ${
                Number(genecodeOfPokemon?.split('sa')[1].split('sd')[0]) || 0
              }`}</p>
              <p>{`sd - ${
                Number(genecodeOfPokemon?.split('sd')[1].split('.')[0]) || 0
              }`}</p>
            </div>

            <div style={{ width: '100px' }}>
              <p>EV</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '13px',
                }}
              >
                <p
                  style={{
                    display: 'flex',
                    margin: '0',
                    gap: '10px',
                    justifyContent: 'space-between',
                    width: '100px',
                  }}
                >
                  hp
                  <input
                    style={{ width: '50px' }}
                    type='number'
                    onChange={e => onEvChange('hp', e)}
                    value={evHP}
                  />
                </p>
                <p
                  style={{
                    display: 'flex',
                    margin: '0',
                    gap: '10px',
                    justifyContent: 'space-between',
                    width: '100px',
                  }}
                >
                  a
                  <input
                    style={{ width: '50px' }}
                    type='number'
                    onChange={e => onEvChange('a', e)}
                    value={evA}
                  />
                </p>
                <p
                  style={{
                    display: 'flex',
                    margin: '0',
                    gap: '10px',
                    justifyContent: 'space-between',
                    width: '100px',
                  }}
                >
                  d
                  <input
                    style={{ width: '50px' }}
                    type='number'
                    onChange={e => onEvChange('d', e)}
                    value={evD}
                  />
                </p>
                <p
                  style={{
                    display: 'flex',
                    margin: '0',
                    gap: '10px',
                    justifyContent: 'space-between',
                    width: '100px',
                  }}
                >
                  s
                  <input
                    style={{ width: '50px' }}
                    type='number'
                    onChange={e => onEvChange('s', e)}
                    value={evS}
                  />
                </p>
                <p
                  style={{
                    display: 'flex',
                    margin: '0',
                    gap: '10px',
                    justifyContent: 'space-between',
                    width: '100px',
                  }}
                >
                  sa
                  <input
                    style={{ width: '50px' }}
                    type='number'
                    onChange={e => onEvChange('sa', e)}
                    value={evSa}
                  />
                </p>
                <p
                  style={{
                    display: 'flex',
                    margin: '0',
                    gap: '10px',
                    justifyContent: 'space-between',
                    width: '100px',
                  }}
                >
                  sd
                  <input
                    style={{ width: '50px' }}
                    type='number'
                    onChange={e => onEvChange('sd', e)}
                    value={evSd}
                  />
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              height: '20px',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <p>Enter genecode</p>
            <input
              style={{ width: '180px' }}
              name='pokeGenecode'
              type='string'
              value={tempGenecodeOfPokemon}
              onChange={onCountGenecode}
              placeholder='h0a0d0s0sa0sd0.100'
            />
            <button
              type='button'
              onClick={() =>
                tempGenecodeOfPokemon &&
                setGenecodeOfPokemon(tempGenecodeOfPokemon)
              }
            >
              Enter
            </button>
            <button
              type='button'
              onClick={() => {
                setGenecodeOfPokemon('h0a0d0s0sa0sd0');
                setEvHP(0);
                setEvA(0);
                setEvD(0);
                setEvS(0);
                setEvSa(0);
                setEvSd(0);
              }}
            >
              Clear All Stats
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ContainerInfo;
