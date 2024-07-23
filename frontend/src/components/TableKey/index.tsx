"use client";

import AddKey from "../../components/AddKey";
import EditKey from "../../components/EditKey";
import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Tooltip,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { CopyIcon } from "./CopyIcon";
import { Alert } from "../../utilities";
import { poppins } from "../../app/fonts";
import { capitalize } from "./utils";
import useKeys from "../../logic/hooks/keys/useKeys";
import { useAuth } from "../../contexts/AuthContext";

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "key",
  "createdAt",
  "expiresAt",
  "user",
  "service",
  "actions",
];

const columns = [
  { name: "Name", uid: "name", sortable: true },
  { name: "Key", uid: "key", sortable: true },
  { name: "Created At", uid: "createdAt", sortable: true },
  { name: "Expires At", uid: "expiresAt", sortable: true },
  { name: "User", uid: "user", sortable: true },
  { name: "Service", uid: "service", sortable: true },
  { name: "Actions", uid: "actions" },
];

export default function TableKey() {
  const { user } = useAuth(); // Assuming useAuth provides user with a token
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const [page, setPage] = useState(1);
  const { keys, loading, error, refetch } = useKeys(user?.token); // Pass the bearer token to the custom hook

  const [currentKey, setCurrentKey] = useState(null); // State to store the current key being edited

  const refreshKeys = () => {
    refetch();
  };

  const openEditModal = (key) => {
    setCurrentKey(key);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentKey(null);
  };

  const pages = Math.ceil(keys.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredKeys = [...keys];

    if (hasSearchFilter) {
      filteredKeys = filteredKeys.filter((key) =>
        key.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredKeys;
  }, [keys, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const copyToClipboard = (key) => {
    const textToCopy = key.key; // Solo copia el valor de la key
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        Alert.fire({
          title: "Copy key",
          text: "Key copied to clipboard.",
          icon: "success",
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const renderCell = useCallback((key, columnKey) => {
    const cellValue = key[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="capitalize text-bold text-small">{cellValue}</p>
          </div>
        );
      case "key":
        return (
          <div className="flex flex-col">
            <p className="capitalize text-bold text-small">{cellValue}</p>
          </div>
        );
      case "createdAt":
        return (
          <div className="flex flex-col">
            <p className="capitalize text-bold text-small">{cellValue}</p>
          </div>
        );
      case "expiresAt":
        return (
          <div className="flex flex-col">
            <p className="capitalize text-bold text-small">{cellValue}</p>
          </div>
        );
      case "user":
        return (
          <div className="flex flex-col">
            <p className="capitalize text-bold text-small">{key.user?.name}</p>
          </div>
        );
      case "service":
        return (
          <div className="flex flex-col">
            <p className="capitalize text-bold text-small">
              {key.service?.name}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center w-full gap-2">
            <Tooltip content="Copy key">
              <span
                className="text-lg cursor-pointer text-default-400 active:opacity-50"
                onClick={() => copyToClipboard(key)}
              >
                <CopyIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit key">
              <span
                className="text-lg cursor-pointer text-default-400 active:opacity-50"
                onClick={() => openEditModal(key)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete key">
              <span className="text-lg cursor-pointer text-danger active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name ..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
              onPress={onOpen}
            >
              Add New
            </Button>
            <Button
              className="bg-foreground text-background"
              size="sm"
              onPress={refreshKeys}
            >
              Refresh
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            Total {keys.length} keys
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    keys.length,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
    );
  }, [page, pages, hasSearchFilter]);

  return (
    <div className="lg:mx-auto lg:max-w-[56.25rem] 2xl:max-w-[79.25rem] p-5 mx-auto my-[60px] xl:max-w-[71.5rem] w-full">
      <div className="w-full">
        <h1
          className={`${poppins.className} text-3xl font-bold text-center mb-6`}
        >
          Key Management
        </h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading keys: {error.message}</p>
        ) : (
          <Table
            aria-label="Keys table with CRUD actions"
            topContent={topContent}
            bottomContent={bottomContent}
            classNames={{
              base: "",
              table: "w-full overflow-visible",
              th: "bg-transparent text-small text-default-500 font-normal",
            }}
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No keys found"}>
              {(sortedItems.length > 0 ? sortedItems : filteredItems).map(
                (key) => (
                  <TableRow key={key.key}>
                    {(columnKey) => (
                      <TableCell>{renderCell(key, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
        <Modal
          isOpen={isOpen}
          scrollBehavior={scrollBehavior}
          onOpenChange={onOpenChange}
          classNames={{
            backdrop: "bg-gray-500/50",
            base: "bg-white text-black",
            header: "text-black",
            body: "text-black",
            footer: "text-black",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <AddKey onSuccess={refreshKeys} />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          scrollBehavior={scrollBehavior}
          onOpenChange={closeEditModal}
          classNames={{
            backdrop: "bg-gray-500/50",
            base: "bg-white text-black",
            header: "text-black",
            body: "text-black",
            footer: "text-black",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  {currentKey && (
                    <EditKey
                      keyId={currentKey.id}
                      initialData={{
                        keyName: currentKey.name,
                        keyValue: currentKey.key,
                        expirationDate: currentKey.expiresAt.split("T")[0],
                        serviceCategory: currentKey.service?.id.toString() || "",
                        keyModel: currentKey.model?.id.toString() || "",
                        createdAt: currentKey.createdAt,
                        user: currentKey.user,
                      }}
                      onSuccess={() => {
                        refreshKeys();
                        closeEditModal();
                      }}
                    />
                  )}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
