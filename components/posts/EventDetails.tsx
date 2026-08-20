import { EventDetailsModel } from "@/lib/posts/post.model";

interface Props {
  data?: EventDetailsModel[];
}

export const EventDetailsInfo = ({ data }: Props) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {data.map((evento, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-green-100 bg-green-50 p-6"
        >
          <h3 className="mb-4 text-sm font-bold tracking-widest text-green-800 uppercase">
            Información del Evento
          </h3>
          <ul className="space-y-3 text-sm text-green-900">
            <li>
              <strong>Inicio:</strong> {evento.startDate}
            </li>
            <li>
              <strong>Fin:</strong> {evento.endDate}
            </li>
            <li>
              <strong>Modalidad:</strong>{" "}
              {evento.isVirtual ? "Virtual" : "Presencial"}
            </li>
            {evento.location && (
              <li>
                <strong>Lugar:</strong> {evento.location}
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};
