function importAll(resolve) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.js$|\.css$|\.svg$|\.png$|\.jpg$/));
import './styles.scss';