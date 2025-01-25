'use client';

import axios from "axios";
import * as Sentry from "@sentry/nextjs";

const BASE_URL = 'https://test.couchconcerts.com';

function Home() {
    const getVersionApi = async () => {
        try {
            await axios.get(`${BASE_URL}/version/ap`);
        } catch (error) {
            console.log('inside catch of getVersionApi', error);
            Sentry.captureException(error);
        }
    }

    const getEventByIdApi = async () => {
        try {
            // await axios.get(`${BASE_URL}/events?eventId=678ca65331d16b6cdb7eab71`);   // valid
            // @typescript-eslint/no-unused-vars
            await axios.get(`${BASE_URL}/events`);   // invalid
            // await axios.get(`${BASE_URL}/events?eventId=678ca65331d16b6cdb7eab7`);   // invalid
        } catch (error) {
            console.log('inside catch of getEventByIdApi', error);
            Sentry.captureException(error);
        }
    }

    const throwError = () => {
        try {
            throw new Error('throwing an error');
        } catch (error) {
            Sentry.captureException(error);
        }
    }

    return (
        <div className={'flex flex-col gap-4 items-center p-10'}>
            <p className={'text-3xl'}>Home Page</p>
            <button className={'px-6 py-1 bg-indigo-500 rounded w-fit'} onClick={getVersionApi}>Tap (Get Version)</button>
            <button className={'px-6 py-1 bg-indigo-500 rounded w-fit'} onClick={getEventByIdApi}>Tap (Get Event)</button>
            <button className={'px-6 py-1 bg-indigo-500 rounded w-fit'} onClick={throwError}>Tap (Throw Error)</button>
        </div>
    );
}

export default Home;
