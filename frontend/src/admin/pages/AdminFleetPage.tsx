import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FiCheckCircle,
  FiEdit2,
  FiPlusCircle,
  FiRefreshCw,
  FiSearch,
  FiStar,
  FiTrash2,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  deleteAdminFleet,
  getAdminFleet,
  updateAdminFleet,
} from "../services/fleetAdminApi";
import type {
  AdminFleetVehicle,
} from "../services/fleetAdminApi";

import "../styles/adminFleet.css";

export default function AdminFleetPage() {
  const navigate = useNavigate();
  const [fleet, setFleet] = useState<
    AdminFleetVehicle[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<
    number | null
  >(null);

  const loadFleet = useCallback(
    async (silent = false) => {
      try {
        silent
          ? setRefreshing(true)
          : setLoading(true);
        setFleet(await getAdminFleet());
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to load fleet.";
        toast.error(message);
        if (message.toLowerCase().includes("session")) {
          navigate("/admin/login", {
            replace: true,
          });
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    void loadFleet();
  }, [loadFleet]);

  const filteredFleet = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return fleet;
    }
    return fleet.filter((vehicle) =>
      [
        vehicle.name,
        vehicle.category,
        vehicle.slug,
      ].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [fleet, search]);

  const toggleActive = async (
    vehicle: AdminFleetVehicle,
  ) => {
    try {
      setUpdatingId(vehicle.id);
      const updated = await updateAdminFleet(
        vehicle.id,
        { active: !vehicle.active },
      );
      setFleet((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item,
        ),
      );
      toast.success(
        updated.active
          ? "Vehicle is now active."
          : "Vehicle is now inactive.",
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to update vehicle.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const removeVehicle = async (
    vehicle: AdminFleetVehicle,
  ) => {
    if (
      !window.confirm(
        'Delete "' +
          vehicle.name +
          '"? This removes its media, features and journeys.',
      )
    ) {
      return;
    }
    try {
      setUpdatingId(vehicle.id);
      await deleteAdminFleet(vehicle.id);
      setFleet((current) =>
        current.filter(
          (item) => item.id !== vehicle.id,
        ),
      );
      toast.success("Fleet vehicle deleted.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to delete vehicle.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-fleet">
      <div className="admin-page-heading">
        <div>
          <span>Fleet CMS</span>
          <h1>Chauffeur fleet</h1>
          <p>
            Manage vehicles, capacity, images,
            journeys and search details.
          </p>
        </div>
        <Link
          className="admin-primary-button"
          to="/admin/fleet/new"
        >
          <FiPlusCircle aria-hidden="true" />
          Add Fleet Vehicle
        </Link>
      </div>

      <div className="admin-fleet__summary">
        <article>
          <FiTruck />
          <div>
            <strong>{fleet.length}</strong>
            <small>Total vehicles</small>
          </div>
        </article>
        <article>
          <FiCheckCircle />
          <div>
            <strong>
              {fleet.filter((item) => item.active).length}
            </strong>
            <small>Active online</small>
          </div>
        </article>
        <article>
          <FiStar />
          <div>
            <strong>
              {fleet.filter((item) => item.featured).length}
            </strong>
            <small>Featured</small>
          </div>
        </article>
      </div>

      <div className="admin-fleet__toolbar">
        <label className="admin-fleet__search">
          <FiSearch aria-hidden="true" />
          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search fleet"
          />
        </label>
        <button
          type="button"
          onClick={() => void loadFleet(true)}
          disabled={refreshing}
        >
          <FiRefreshCw
            className={
              refreshing ? "admin-fleet__spin" : ""
            }
          />
          Refresh
        </button>
      </div>

      <section className="admin-fleet__panel">
        {loading ? (
          <p className="admin-fleet__empty">
            Loading fleet…
          </p>
        ) : filteredFleet.length === 0 ? (
          <p className="admin-fleet__empty">
            No fleet vehicles found. Add your first
            approved chauffeur vehicle.
          </p>
        ) : (
          <div className="admin-fleet__table-wrap">
            <table className="admin-fleet__table">
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Capacity</th>
                  <th>Media</th>
                  <th>Visibility</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFleet.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>
                      <div className="admin-fleet__vehicle">
                        {vehicle.coverImage ? (
                          <img
                            src={vehicle.coverImage}
                            alt=""
                          />
                        ) : (
                          <FiTruck />
                        )}
                        <div>
                          <strong>{vehicle.name}</strong>
                          <span>{vehicle.category}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {vehicle.passengers} passengers
                      <small>
                        {vehicle.largeBags} large /
                        {" "}{vehicle.cabinBags} cabin bags
                      </small>
                    </td>
                    <td>{vehicle.media.length} items</td>
                    <td>
                      <button
                        type="button"
                        className={
                          vehicle.active
                            ? "admin-fleet__status admin-fleet__status--active"
                            : "admin-fleet__status"
                        }
                        disabled={
                          updatingId === vehicle.id
                        }
                        onClick={() =>
                          void toggleActive(vehicle)
                        }
                      >
                        {vehicle.active ? (
                          <FiCheckCircle />
                        ) : (
                          <FiXCircle />
                        )}
                        {vehicle.active
                          ? "Active"
                          : "Inactive"}
                      </button>
                    </td>
                    <td>{vehicle.displayOrder}</td>
                    <td>
                      <div className="admin-fleet__actions">
                        <Link
                          to={
                            "/admin/fleet/" +
                            vehicle.id +
                            "/edit"
                          }
                          aria-label={
                            "Edit " + vehicle.name
                          }
                        >
                          <FiEdit2 />
                        </Link>
                        <button
                          type="button"
                          disabled={
                            updatingId === vehicle.id
                          }
                          onClick={() =>
                            void removeVehicle(vehicle)
                          }
                          aria-label={
                            "Delete " + vehicle.name
                          }
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
