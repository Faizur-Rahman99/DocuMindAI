interface Props {

    filename: string;

    score: number;

}

export default function SourceCard({
    filename,
    score,
}: Props) {

    return (

        <div className="
            border
            rounded-lg
            p-3
            bg-slate-50
        ">

            <div className="font-medium">

                📄 {filename}

            </div>

            <div className="text-sm text-gray-500">

                Similarity:

                {" "}

                {(score * 100).toFixed(1)}%

            </div>

        </div>

    );

}