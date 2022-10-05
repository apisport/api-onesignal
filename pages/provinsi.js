//@ts-check
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';
import Link from 'next/link';


export default function Provinsi() {
    // const [provinsi, setProvinsi] = useState('');
    // const [kabupaten, setKabupaten] = useState('');
    let provinsi = ''
    let kabupaten = ''
    let idProvinsi = {}
    let tesKabupaten = []

    const [kabupatenArrayTemp, setKabupatenArrayTemp] = useState([]);

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let url = '/api/alamatdb'
    const { data: data, error } = useSWR(url, fetcher)

    if (!data) {
        return <div>Loading...</div>
    } else if (error) {
        return <div>Something went wrong</div>
    }

    let alamat = data['message']
    console.log(alamat)



    const setKabupatenFunc = (e) => {
        setKabupatenArrayTemp([])
        provinsi = document.getElementById('inProvinsi').value
        if (provinsi != '') {
            idProvinsi = alamat.provinces.find(x => x.name === provinsi)
            console.log(idProvinsi.id)
            tesKabupaten = alamat.regencies.filter(x => x.province_id === idProvinsi.id)
            setKabupatenArrayTemp(tesKabupaten)
        }

    };

    const setVillageFunc = (e) => {
        setKabupatenArrayTemp([])
        provinsi = document.getElementById('inProvinsi').value
        idProvinsi = alamat.provinces.find(x => x.name === provinsi)
        console.log(idProvinsi.id)
        tesKabupaten = alamat.regencies.filter(x => x.province_id === idProvinsi.id)
        setKabupatenArrayTemp(tesKabupaten)
    };

    return (
        <div className='container'>
            <label>Provinsi</label>
            <select id='inProvinsi' onChange={setKabupatenFunc}>
                <option value={''}>--- Pilih Provinsi ---</option>
                {alamat.provinces.map((data, i) => (

                    <>
                        <option value={data.name}>{data.name}</option>
                    </>
                ))}
            </select><br></br>
            <label>Kabupaten</label>
            <select id='inKabupaten' >
                <option value={''}>--- Pilih Kabupaten ---</option>
                {kabupatenArrayTemp.length === 0 ? (
                    <></>
                ) : (
                    <>

                        {kabupatenArrayTemp.map((data, i) => (

                            <>
                                <option value={data.name}>{data.name}</option>
                            </>
                        ))}
                    </>
                )}
            </select>
            <br></br>
            <label>Desa</label>
            <select id='inDesa'>
                <option value={''}>--- Pilih Kecamatan ----</option>
            </select>
        </div>
    )
}
