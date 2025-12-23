import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
    marginBottom: 12,
  },
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  fieldset: {
    width: '100%',
    maxWidth: 420,
    paddingHorizontal: 8,
  },
  label: {
    color: '#ddd',
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    color: 'white',
    backgroundColor: '#1f2937',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  enabledBtn: {
    backgroundColor: '#2563eb',
  },
  disabledBtn: {
    backgroundColor: '#222222ff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  table: {
    width: '100%',
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#0b1220', // fundo da tabela
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#111827', // cor do cabeçalho
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  headerText: {
    color: '#e5e7eb',
    fontWeight: '700',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    backgroundColor: '#071028',
  },
  cell: {
    flex: 1,
    paddingRight: 8,
    color: '#d1d5db',
    fontSize: 14,
  },
});