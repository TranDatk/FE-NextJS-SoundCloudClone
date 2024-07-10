
import { CardMedia, Container, Grid } from "@mui/material";
import { getIdFromUrl, sendRequest } from '@/utils/api';
import Divider from '@mui/material/Divider';
import { Box } from "@mui/material";
import WaveTrack from "@/components/track/wave.track";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
    title: 'Nghe nhạc với Sound cloud',
    description: 'Mô tả',
}

const DetailTrackPage = async ({ params }: { params: { slug: string } }) => {
    const session = await getServerSession(authOptions);
    const id = getIdFromUrl(params.slug);
    const res = await sendRequest<IBackendRes<ITrack>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}tracks/${id}/`,
        method: "GET",
        nextOption: { next: { tags: ['track-by-id'] } }
    })

    const resComments = await sendRequest<IBackendRes<IComment[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}comments/${id}/fetch-comments`,
        method: "GET",
        nextOption: { cache: "no-store" }
    });

    const resFollow = await sendRequest<IBackendRes<IFollow>>({
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}followers/${res?.data?.user?._id}`,
        method: "GET",
        nextOption: { next: { tags: ['follow'] } }
    });

    if (res.statusCode === 404) {
        notFound();
    }

    return (
        <Container>
            {res.data && (
                <WaveTrack
                    id={id}
                    track={res.data}
                    comments={resComments.data?.reverse() ?? []}
                    isFollow={resFollow?.data?.isFollow ?? false}
                />
            )}
        </Container>
    )
}

export default DetailTrackPage;